use hdk::holochain_json_api::{error::JsonError, json::JsonString};
use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
  holochain_core_types::{
    dna::entry_types::Sharing,
    entry::Entry,
    error::HolochainError,
    signature::{Provenance, Signature},
    validation::EntryValidationData,
  },
  holochain_persistence_api::cas::content::Address,
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
  pub provenance: Provenance,
}

impl Transfer {
  pub fn new(info: TransferInfo, provenance: Provenance) -> Transfer {
    Transfer {
      info: info.to_owned(),
      provenance: provenance.to_owned(),
    }
  }
}
