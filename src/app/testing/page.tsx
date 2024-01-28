"use client";

import { useEffect } from "react";

import crypto from "crypto";

import CryptoJS from "crypto-js";

const DiscourseConnectPage = () => {
  useEffect(() => {
    const nonce = crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);

    const payload = `nonce=${nonce}&return_sso_url=${encodeURIComponent(
      "http://localhost:3000/testing/success"
    )}`;

    // Step 3: Base64 encode the payload
    const base64Payload = btoa(payload);

    // Step 4: URL encode the base64-encoded payload
    const urlEncodedPayload = encodeURIComponent(base64Payload);

    const secret = "_qYR_u;F84&~9)-";
    const hexSignature = CryptoJS.HmacSHA256(base64Payload, secret).toString(
      CryptoJS.enc.Hex
    );

    console.log(
      //   `https://disabilityforums.com.au/session/sso_provider?sso=${urlEncodedPayload}&sig=${hexSignature}`
      `https://disabilityforums.com.au/session/sso_provider?sso=${urlEncodedPayload}&sig=${hexSignature}`
    );
  }, []);

  return <div>Redirecting to Discourse for authentication...</div>;
};

export default DiscourseConnectPage;
