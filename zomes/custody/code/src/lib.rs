#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;

use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
  holochain_core_types::{
    cas::content::Address, dna::entry_types::Sharing, entry::Entry, error::HolochainError,
    json::JsonString, validation::EntryValidationData,
  },
};

pub mod trace;
pub mod transfer;
pub mod sender;
pub mod receiver;

define_zome! {
  entries: [
    transfer::definition(),
    trace::definition()
  ]

  genesis: || { Ok(()) }

  receive: |from, msg_json| {
    receiver::handle_receive_transfer_request(from, JsonString::from_json(&msg_json))
  }

  functions: [
    request_transfer: {
      inputs: |to_agent: Address, transfer_info: transfer::TransferInfo|,
      outputs: |result: ZomeApiResult<Address>|,
      handler: sender::handle_request_transfer
    }
    create_object_trace: {
      inputs: |object_address: Address|,
      outputs: |result: ZomeApiResult<Address>|,
      handler: trace::handle_create_object_trace
    }
  ]

  traits: {
    hc_public [request_transfer,create_object_trace]
  }
}
