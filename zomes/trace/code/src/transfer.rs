use hdk::{
    self,
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_core_types::{
        cas::content::Address,
        entry::{entry_type::AppEntryType, AppEntryValue, Entry},
        error::HolochainError,
        json::JsonString,
    },
    holochain_wasm_utils::api_serialization::{
        get_entry::GetEntryOptions, get_links::GetLinksResult,
    },
    AGENT_ADDRESS,
};

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct TransferLocation {
  latitude: f32,
  longidute: f32
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct Transfer {
  observations: String,
  location: TransferLocation
}


impl Transfer {
  pub fn new(observations: &str, latitude: f32, longitude: f32) -> Transfer {
    Transfer {
      observations: observations.to_owned(),
      location: Location {
        latitude: latitude.to_owned(),
        longitude: longitude.to_owned()
      }
    }
  }
}

pub fn definition() -> ValidatingEntryType {
  entry!(
    name: "transfer",
    description: "transfer representation between two agents",
    sharing: Sharing::Public,
    native_type: Transfer,

    validation_package: || {
      hdk::ValidationPackageDefinition::ChainFull
    },

    validation: |transfer: Transfer, _ctx: hdk::ValidationData| {
      Ok(())
    },

    links: [
      from!(
        "traceable",
        tag: "trace",
        validation_package: || {
          hdk::ValidationPackageDefinition::ChainFull
        },
        validation: |_source: Address, _target: Address, _ctx: hdk::ValidationData | {
          Ok(())
        }
      ),
      from!(
        "%agent_id",
        tag: "pending_transfer",
        validation_package: || {
          hdk::ValidationPackageDefinition::ChainFull
        },
        validation: |_source: Address, _target: Address, _ctx: hdk::ValidationData | {
          Ok(())
        }
      ),
      from!(
        "transfer",
        tag: "confirmation_transfer",
        validation_package: || {
          hdk::ValidationPackageDefinition::ChainFull
        },
        validation: |_source: Address, _target: Address, _ctx: hdk::ValidationData | {
          Ok(())
        }
      )
    ]
  )
}

pub fn handle_get_transfer(transfer_address: Address) -> ZomeApiResult<Transfer> {
  hdk::get_entry(transfer_address)
}

pub fn handle_start_transfer_custody(
  traceable_address: Address, receiver_address: Address, 
  observations: String, latitude: f32, latitude: f32
) -> ZomeApiResult<Address> {
  let transfer_entry = Entry::new(EntryType::App(
    AppEntryType::from("transfer"),
    Transfer::from(&observations, &latitude, &longitude).into()
  });

  let address = hdk::commit_entry(&transfer_entry)?;

  hdk::link_entries(&receiver_address, &address, "pending_transfer")?;

  Ok(address)
}

pub fn handle_confirm_transfer_custody(
  transfer_address: Address
) -> ZomeApiResult<Address> {
  let transfer = hdk::get_entry(address)?;

  let address = hdk::commit_entry(&transfer)?;

  // Remove "pending transfer" link
  // Remove "current custodian" link

  hdk::link_entries(&transfer_address, &address, "confirmation_transfer")?;
  hdk::link_entries(&transfer_address, &address, "current_custodian")?;

  Ok(address)
}