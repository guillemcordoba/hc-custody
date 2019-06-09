use hdk::{
  entry_definition::ValidatingEntryType,
  error::ZomeApiResult,
  holochain_core_types::{
    cas::content::Address, dna::entry_types::Sharing, entry::Entry, error::HolochainError,
    json::JsonString, signature::Signature, validation::EntryValidationData,
  },
};

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone, PartialEq)]
pub struct GeoLocation {
  latitude: f64,
  longitude: f64,
}

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone, PartialEq)]
pub struct Transfer {
  sender_agent: Address,
  receiver_agent: Address,
  object_address: Address,
  previous_transfer: Address,
  description: String,
  timestamp: u128,
  location: GeoLocation,
}

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone, PartialEq)]
pub struct SignedTransfer {
  transfer: Transfer,
  own_signature: Signature,
  peer_signature: Signature,
}

pub fn sender_definition() -> ValidatingEntryType {
  entry!(
    name: "sender_transfer",
    description: "represents the signed transfer that the sender commits in their source chain",
    sharing: Sharing::Public,
    validation_package: || {
      hdk::ValidationPackageDefinition::ChainFull
    },

    validation: | _validation_data: hdk::EntryValidationData<SignedTransfer>| {
      Ok(())
    },
    links: [
      to!(
        "receiver_transfer",
        link_type: "to_receiver",
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

pub fn receiver_definition() -> ValidatingEntryType {
  entry!(
    name: "receiver_transfer",
    description: "represents the signed transfer that the receiver commits in their source chain",
    sharing: Sharing::Public,
    validation_package: || {
      hdk::ValidationPackageDefinition::ChainFull
    },

    validation: | _validation_data: hdk::EntryValidationData<SignedTransfer>| {
      Ok(())
    },
    links: [
      to!(
        "sender_transfer",
        link_type: "to_sender",
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
