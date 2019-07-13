use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
  holochain_core_types::{

    cas::content::Address, dna::entry_types::Sharing, entry::{entry_type::EntryType,Entry}, error::{HolochainError,ZomeApiError},
    json::JsonString, signature::Signature, validation::EntryValidationData,
  },AGENT_ADDRESS,
      holochain_wasm_utils::api_serialization::{QueryArgsOptions, QueryResult}
};
use std::convert::TryFrom;

use crate::transfer::{TransferInfo, Transfer, SignedTransfer};

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct MessageBody {
  transfer: Transfer,
  transfer_signature: Signature
}

pub fn handle_request_transfer(
  to_agent: Address,
  transfer_info: TransferInfo,
) -> ZomeApiResult<Address> {
  let previous_address = match get_previous_transfer(transfer_info.object_address.clone())? {
    Some(previous_transfer_address) => previous_transfer_address,
    None => {
      let trace_entry = trace::Trace::entry(transfer_info.object_address.clone());
      hdk::entry_address(trace_entry)
    }
  };

  let transfer = Transfer::new(transfer_info, AGENT_ADDRESS, to_agent, previous_address);

  let transfer_signature = hdk::sign(transfer)?;

  let message = MessageBody {
    transfer: transfer,
    transfer_signature: transfer_signature
  };

  hdk::send(to_agent, message, 60000)?;

  Ok(())
}
