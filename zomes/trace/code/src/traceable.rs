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
pub struct Traceable {
  name: String,
  description: String
}

impl Traceable {
  pub fn new(name: &str, description: &str) -> Traceable {
    Traceable {
      name: name.to_owned(),
      description: description.to_owned(),
    }
  }
}

pub fn definition() -> ValidatingEntryType {
  entry!(
    name: "traceable",
    description: "traceable object entry",
    sharing: Sharing::Public,
    native_type: Traceable,

    validation_package: || {
      hdk::ValidationPackageDefinition::ChainFull
    },

    validation: |post: crate::post::Post, _ctx: hdk::ValidationData| {
      Ok(())
    },

    links: [
      from!(
        "traceable",
        tag: "current_custodian",
          validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
          },
          validation: |_source: Address, _target: Address, _ctx: hdk::ValidationData | {
            Ok(())
          }
      ),
      from!(
        "traceable",
        tag: "owner",
          validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
          },
          validation: |_source: Address, _target: Address, _ctx: hdk::ValidationData | {
            Ok(())
          }
      ),
      from!(
        "%agent_id",
        tag: "current_traceables",
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


pub fn handle_register_traceable(name: String, description: String) -> ZomeApiResult<Address> {
  let traceable_entry = Entry::new(EntryType::App(
    AppEntryType::from("traceable"),
    Traceable::from(&name, &description).into()
  });

  let address = hdk::commit_entry(&traceable_entry)?;

  hdk::link_entries(&AGENT_ADDRESS, &address, "owner")?;
  hdk::link_entries(&AGENT_ADDRESS, &address, "current_custodian")?;

  Ok(address)
}

pub fn handle_get_owner(traceable_address: Address) -> ZomeApiResult<Address> {
  hdk::get_links(&traceable_address, "owner")
}

pub fn handle_get_current_custodian(traceable_address: Address) -> ZomeApiResult<Address> {
  hdk::get_links(&traceable_address, "current_custodian")
}

pub fn handle_list_current_traceables() -> ZomeApiResult<Vec<Traceable>> {
  let traceables_addresses = hdk::get_links(&AGENT_ADDRESS, "current_traceables")?;
  

}