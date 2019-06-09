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

pub mod handlers;
pub mod trace;
pub mod transfer;

define_zome! {
  entries: [
    transfer::sender_definition(),
    transfer::receiver_definition(),
    trace::definition()
  ]

  genesis: || { Ok(()) }

  receive: |from, msg_json| {
    handlers::handle_receive_transfer_request(from, JsonString::from_json(&msg_json))
  }

  functions: [
    request_transfer: {
      inputs: |from_agent: Address, request: handlers::TransferRequest|,
      outputs: |result: ZomeApiResult<Address>|,
      handler: handlers::handle_request_transfer
    }
    create_object_trace: {
      inputs: |object_address: Address|,
      outputs: |result: ZomeApiResult<Address>|,
      handler: handlers::handle_create_object_trace
    }
  ]

  traits: {
    hc_public [create_my_entry,get_my_entry]
  }
}
