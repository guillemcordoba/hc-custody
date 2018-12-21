#![feature(try_from)]

#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate boolinator;
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;

pub mod traceable;
pub mod transfer;
use transfer::Transfer;

use hdk::{
  error::ZomeApiResult,
  holochain_core_types::{cas::content::Address, entry::Entry, json::JsonString},
  holochain_wasm_utils::api_serialization::get_links::GetLinksResult,
};

// see https://developer.holochain.org/api/0.0.2/hdk/ for info on using the hdk library

define_zome! {
  entries: [
    traceable::definition(),
    transfer::definition()
  ]

  genesis: || { Ok(()) }

  functions: {
    register_traceable: {
      inputs: |name: String, description: String|,
      outputs: |result: ZomeApiResult<Address>|,
      handler: traceable::handle_register_traceable
    }

    start_transfer_custody: {
      inputs: |traceable_address: Address, receiver_address: Address,
        observations: String, latitude: f32, longitude: f32|,
      outputs: |result: ZomeApiResult<Address>|,
      handler: transfer::handle_start_transfer_custody
    }

    confirm_transfer_custody: {
      inputs: |transfer_address: Address|,
      outputs: |result: ZomeApiResult<Address>|,
      handler: transfer::handle_confirm_transfer_custody
    }

    get_owner: {
      inputs: |traceable_address: Address|,
      outputs: |result: ZomeApiResult<Address>|,
      handler: traceable::handle_get_owner  
    }
    
    get_current_custodian: {
      inputs: |traceable_address: Address|,
      outputs: |result: ZomeApiResult<Address>|,
      handler: traceable::handle_get_current_custodian  
    }
    
    get_transfer: {
      inputs: |transfer_address: Address|,
      outputs: |transfer: ZomeApiResult<Transfer>|,
      handler: transfer::handle_get_transfer
    }

    list_current_traceables: {
      inputs: | |,
      outputs: |current_traceables: ZomeApiResult<Vec<Traceable>>|,
      handler: transfer::handle_list_current_traceables
    }

    list_pending_transfers: {
      inputs: | |,
      outputs: |pending_transfers_address: ZomeApiResult<Vec<Address>>|,
      handler: transfer::handle_list_pending_transfer
    }

    list_trace: {
      inputs: |traceable_address: Address|,
      outputs: |trace: ZomeApiResult<Vec<Transfer>>|,
      handler: transfer::handle_list_trace
    }

  }
}
