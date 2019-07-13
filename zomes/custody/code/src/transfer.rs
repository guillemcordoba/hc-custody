use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
  holochain_core_types::{
    cas::content::Address, dna::entry_types::Sharing, entry::Entry, error::HolochainError,
    json::JsonString, signature::Signature, validation::EntryValidationData,
  },
};

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone, PartialEq)]
pub struct GeoLocation {
  pub latitude: f64,
  pub longitude: f64,
}

#[derive(Serialize, Deserialize, Clone, Debug, DefaultJson, PartialEq)]
pub struct TransferInfo {
  pub object_address: Address,
  pub description: String,
  pub timestamp: u128,
  pub location: GeoLocation,
}

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone, PartialEq)]
pub struct Transfer {
  pub info: TransferInfo,

  pub sender_agent: Address,
  pub receiver_agent: Address,
  pub previous_transfer: Address,
}

impl Transfer {
  pub fn new(
    info: TransferInfo,
    sender_agent: Address,
    receiver_agent: Address,
    previous_transfer: Address,
  ) -> Transfer {
    Transfer {
      info: info.to_owned(),
      sender_agent: sender_agent.to_owned(),
      receiver_agent: receiver_agent.to_owned(),
      previous_transfer: previous_transfer.to_owned(),
    }
  }
}

pub fn definition() -> ValidatingEntryType {
  entry!(
    name: "transfer",
    description: "transfer entry that both sender and receiver commit to their source chain",
    sharing: Sharing::Public,
    validation_package: || {
      hdk::ValidationPackageDefinition::ChainFull
    },

    validation: | _validation_data: hdk::EntryValidationData<Transfer>| {
      Ok(())
    },
    links: []
  )
}
