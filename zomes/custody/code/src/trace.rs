use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
  holochain_core_types::{
    cas::content::Address, dna::entry_types::Sharing, entry::Entry, error::HolochainError,
    json::JsonString, signature::Signature, validation::EntryValidationData,
  },
};

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Trace {
  object_address: Address
}

impl Trace {
  pub fn new(object_address: Address) -> Trace {
    Trace {
      object_address: object_address.to_owned()
    }
  }
  pub fn entry(object_address: Address) -> Entry {
    Entry::App("trace".into(), Trace::new(object_address).into())
  }
}

pub fn definition() -> ValidatingEntryType {
  entry!(
    name: "trace",
    description: "anchor entry for the trace of the object",
    sharing: Sharing::Public,
    validation_package: || {
      hdk::ValidationPackageDefinition::ChainFull
    },

    validation: | _validation_data: hdk::EntryValidationData<Trace>| {
      Ok(())
    },
    links: [
      to!(
        "transfer",
        link_type: "trace",
        validation_package: || {
          hdk::ValidationPackageDefinition::ChainFull
        },
        validation: | validation_data: hdk::LinkValidationData | {
          Ok(())
        }
      )
    ]
  )
}

pub fn handle_create_object_trace(object_address: Address) -> ZomeApiResult<Address> {
  let trace_entry = Trace::entry(object_address);
  hdk::commit_entry(&trace_entry)
}