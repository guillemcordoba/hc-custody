use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
      holochain_json_api::{
        json::JsonString,
        error::JsonError
    },
    holochain_persistence_api::{
        cas::content::Address,
    },

  holochain_core_types::{
    dna::entry_types::Sharing, entry::Entry, error::HolochainError,
    signature::Signature, validation::EntryValidationData,
  },
};

use crate::trace::Trace;
use crate::transfer::{Transfer, TransferInfo};
use crate::sender::MessageBody;

pub fn handle_receive_transfer_request(from: Address, json_msg: JsonString) -> String {
  let maybe_message: Result<MessageBody, _> = json_msg.try_into();
  let response = match maybe_message {
    Err(err) => format!("error: {}", err),
    Ok(message) => {
      let transfer: Transfer = message.transfer;
      let trace = Trace::from(transfer.info.object_address.clone(), transfer.clone());

      let signature_valid = hdk::verify_signature(transfer.provenance, transfer.info.into())?;

      if !signature_valid {
        format!("error: signature not valid")
      }

      match hdk::update_entry(transfer.info.object_address, trace) {
        Err(err) => format!("error: {}", err),
        Ok(address) => address
      }
    }
  }
}
