use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
  holochain_core_types::{
    cas::content::Address, dna::entry_types::Sharing, entry::Entry, error::HolochainError,
    json::JsonString, signature::Signature, validation::EntryValidationData,
  },
};

use crate::trace::Trace;
use crate::transfer::GeoLocation;

#[derive(Serialize, Deserialize, Debug, DefaultJson, PartialEq)]
pub struct TransferRequest {
  object_address: Address,
  description: String,
  timestamp: u128,
  location: GeoLocation,
}

pub fn handle_create_object_trace(object_address: Address) -> ZomeApiResult<Address> {
  let trace_entry = Trace::entry(object_address);
  hdk::commit_entry(&trace_entry)
}

pub fn handle_request_transfer(from_agent: Address, request: TransferRequest) -> ZomeApiResult<Address> {
  Ok(())
}

pub fn handle_receive_transfer_request(from: Address, json_msg: JsonString) -> String {
  String::from("hi")
}
