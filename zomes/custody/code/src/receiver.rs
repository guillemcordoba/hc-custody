use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
  holochain_core_types::{
    cas::content::Address, dna::entry_types::Sharing, entry::Entry, error::HolochainError,
    json::JsonString, signature::Signature, validation::EntryValidationData,
  },
};

use crate::trace::Trace;
use crate::transfer::TransferInfo;

pub fn handle_receive_transfer_request(from: Address, json_msg: JsonString) -> String {
  String::from("hi")
}
