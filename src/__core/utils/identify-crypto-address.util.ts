interface IIdentifyCryptoAddress {
    name: string;
    address: string;
};

export const identifyCryptoAddress = (address: string): IIdentifyCryptoAddress => {
    const regexPatterns: { [key: string]: RegExp } = {
      BTC: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
      ETH: /^0x[a-fA-F0-9]{40}$/,
      XRP: /^r[0-9a-zA-Z]{24,34}$/,
      LTC: /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/,
      BCH: /^bitcoincash:q[0-9a-zA-Z]{41}$/,
      ADA: /^addr1[0-9a-zA-Z]{58}$/,
      XLM: /^G[0-9a-zA-Z]{55}$/,
      DOT: /^1[0-9a-zA-Z]{46}$/,
      BNB: /^(bnb1)[0-9a-zA-Z]{38}$/,
      LINK: /^0x[a-fA-F0-9]{40}$/,
      DOGE: /^(D|A|9)[a-km-zA-HJ-NP-Z1-9]{34}$/,
      TRX: /^(T|T0|T1)[0-9a-zA-Z]{33}$/,
      NEO: /^A[0-9a-zA-Z]{33}$/,
      ATOM: /^cosmos1[0-9a-zA-Z]{38}$/,
      VET: /^(0x)?[0-9a-fA-F]{40}$/,
      EOS: /^(eos1|EOS)[0-9a-zA-Z]{11,}$/
    };

    for (const crypto in regexPatterns) {
      if (address.match(regexPatterns[crypto])) {
        return {
          name: crypto,
          address: address
        };
      }
    }
  
    return {
      name: "UNKNOWN",
      address: address
    };
  };