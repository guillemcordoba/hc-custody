use hdk::{
holochain_json_api::{error::JsonError, json::JsonString},
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

use crate::transfer::Transfer;

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Trace {
  object_address: Address,
  transfer: Option<Transfer>,
}

impl Trace {
  pub fn from(object_address: Address, transfer: Option<Transfer>) -> Trace {
    Trace {
      object_address: object_address.to_owned(),
      transfer: transfer.to_owned(),
    }
  }

  pub fn new_trace(object_address: Address) -> Trace {
    Trace {
      object_address: object_address.to_owned(),
      transfer: None,
    }
  }

  pub fn entry(object_address: Address) -> Entry {
    Entry::App("trace".into(), Trace::new_trace(object_address).into())
  }
}

pub fn definition() -> ValidatingEntryType {
  entry!(
    name: "trace",
    description: "trace of the object",
    sharing: Sharing::Public,
    validation_package: || {
      hdk::ValidationPackageDefinition::Entry
    },

    validation: | _validation_data: hdk::EntryValidationData<Trace>| {
      match _validation_data {
        hdk::EntryValidationData::Create { entry: _ ,validation_data: __} => Ok(()),
        hdk::EntryValidationData::Modify {
          new_entry: new_trace,old_entry:old_trace,old_entry_header:_,validation_data:_ } => {
          // TODO: Check that the last provenance from the trace
          // was the last person to update the entry
        },
        _ => Err("Cannot delete a trace")
      }
    },
    links: []
  )
}

pub fn handle_create_object_trace(object_address: Address) -> ZomeApiResult<Address> {
  let trace_entry = Trace::entry(object_address);
  hdk::commit_entry(&trace_entry)
}

pub fn handle_get_object_trace(object_address: Address) -> ZomeApiResult<Option<EntryHistory>> {
  let trace_entry = Trace::entry(object_address);

  let trace_entry = hdk::entry_address(&trace_entry)?;

  hdk::get_entry_history(&trace_entry)
}
