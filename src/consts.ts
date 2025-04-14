import { HexString } from '@gear-js/api/types';

export const INITIAL_BLOCKS_FOR_VOUCHER: number = 1_200; // one hour
export const INITIAL_VOUCHER_TOKENS: number = 2;
export const NETWORK: string = 'wss://testnet.vara.network'
export const SPONSOR_NAME: string = 'admindavid';
export const SPONSOR_MNEMONIC: string = 'strong orchard plastic arena pyramid lobster lonely rich stomach label clog rubber';
export const CONTRACT_ID: HexString = '0x7b8208253db040111a63beb60be29ef6ce3e0e23bc5ec7b75faf838bd3157029 ';
export const IDL: string = `
type KeyringData = struct {
  address: str,
  encoded: str,
};

type KeyringEvent = enum {
  KeyringAccountSet,
  Error: KeyringError,
};

type KeyringError = enum {
  KeyringAddressAlreadyEsists,
  UserAddressAlreadyExists,
  UserCodedNameAlreadyExists,
  UserDoesNotHasKeyringAccount,
  KeyringAccountAlreadyExists,
  SessionHasInvalidCredentials,
  UserAndKeyringAddressAreTheSame,
};

type KeyringQueryEvent = enum {
  KeyringAccountAddress: opt actor_id,
  KeyringAccountData: opt KeyringData,
};

type TrafficLightEvent = enum {
  Green,
  Yellow,
  Red,
  Nothing,
  KeyringError: KeyringError,
};

type IoTrafficLightState = struct {
  current_light: str,
  all_users: vec struct { actor_id, str },
};

constructor {
  New : ();
};

service KeyringSvc {
  BindKeyringDataToUserAddress : (user_address: actor_id, keyring_data: KeyringData) -> KeyringEvent;
  BindKeyringDataToUserCodedName : (user_coded_name: str, keyring_data: KeyringData) -> KeyringEvent;
  query KeyringAccountData : (keyring_address: actor_id) -> KeyringQueryEvent;
  query KeyringAddressFromUserAddress : (user_address: actor_id) -> KeyringQueryEvent;
  query KeyringAddressFromUserCodedName : (user_coded_name: str) -> KeyringQueryEvent;
};

service TrafficLight {
  Green : (user_address: actor_id) -> TrafficLightEvent;
  Red : (user_address: actor_id) -> TrafficLightEvent;
  Yellow : (user_address: actor_id) -> TrafficLightEvent;
  query TrafficLight : () -> IoTrafficLightState;
};
`;