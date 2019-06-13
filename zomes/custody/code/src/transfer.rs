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
  pub latitude: f64,
  pub longitude: f64,
}

#[derive(Serialize, Deserialize, Clone, Debug, DefaultJson, PartialEq)]
pub struct TransferInfo {
  pub object_address: Address,
  pub description: String,
  pub timestamp: u128,
  pub location: GeoLocation,
}

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone, PartialEq)]
pub struct Transfer {
  pub info: TransferInfo,

  pub sender_agent: Address,
  pub receiver_agent: Address,
  pub previous_transfer: Address,
}

impl Transfer {
  pub fn new(
    info: TransferInfo,
    sender_agent: Address,
    receiver_agent: Address,
    previous_transfer: Address,
  ) -> Transfer {
    Transfer {
      info: info.to_owned(),
      sender_agent: sender_agent.to_owned(),
      receiver_agent: receiver_agent.to_owned(),
      previous_transfer: previous_transfer.to_owned(),
    }
  }
}

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone, PartialEq)]
pub struct SignedTransfer {
  pub transfer: Transfer,
  pub own_signature: Signature,
  pub peer_signature: Signature,
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
