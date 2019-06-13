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
  previous_transfer: Address,
  transfer: Transfer,
  transfer_signature: Signature
}

fn query_entries(entry_type: String) -> ZomeApiResult<Vec<(Address, Entry)>> {
    match hdk::query_result(
        entry_type.into(),
        QueryArgsOptions {
            entries: true,
            ..Default::default()
        })? {
          QueryResult::Entries(entries) => Ok(entries),
        _ => Err(ZomeApiError::Internal("failed to get entries".into())),
        }
}

fn get_previous_transfer(object_address: Address) -> ZomeApiResult<Option<Address>> {
  let receiver_transfers = query_entries(String::from("receiver_transfer"))?;
  let sender_transfers = query_entries(String::from("sender_transfer"))?;

  let open_transfers = receiver_transfers.into_iter().filter(||)

  let maybe_previous_transfer = open_transfers.into_iter().find(|receiver_transfer| {
    match receiver_transfer.1 {
      Entry::App(_, json_string) => {
        match SignedTransfer::try_from(json_string) {
          Ok(signed_transfer) => signed_transfer.transfer.info.object_address == object_address,
          _ => false
        }
      }
      _ => false,
    }  
  });

  Ok(maybe_previous_transfer)
}

pub fn handle_request_transfer(
  to_agent: Address,
  transfer_info: TransferInfo,
) -> ZomeApiResult<Address> {

  let transfer = Transfer::new(info, AGENT_ADDRESS, to_agent, previous_transfer: Address)


  hdk::send(to_agent, , 60000)?;

  Ok(())
}
