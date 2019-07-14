use crate::transfer::{Transfer, TransferInfo};
use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
  holochain_core_types::{
    dna::entry_types::Sharing,
    entry::{entry_type::EntryType, Entry},
    error::{HolochainError, ZomeApiError},
    signature::{Provenance, Signature},
    validation::EntryValidationData,
  },
  holochain_json_api::{error::JsonError, json::JsonString},
  holochain_persistence_api::cas::content::Address,
  holochain_wasm_utils::api_serialization::{QueryArgsOptions, QueryResult},
  AGENT_ADDRESS,
};
use std::convert::{TryFrom, TryInto};

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct MessageBody {
  transfer: Transfer,
}

pub fn handle_request_transfer(
  to_agent: Address,
  transfer_info: TransferInfo,
) -> ZomeApiResult<Address> {
  let signature = hdk::sign(transfer_info.into())?;
  let provenance = Provenance::new(AGENT_ADDRESS.to_owned(), Signature::from(signature));

  let transfer = Transfer::new(transfer_info, provenance);
  let message = MessageBody { transfer: transfer };

  let result_json = hdk::send(to_agent, JsonString::from(message).into(), 60000.into())?;

  let result: ZomeApiResult<Address> = result_json.try_into()?;

  result
}
