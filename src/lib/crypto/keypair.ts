export async function generateKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign", "verify"]
  );

  const publicKey = await crypto.subtle.exportKey(
    "jwk",
    keyPair.publicKey
  );

  const privateKey = await crypto.subtle.exportKey(
    "jwk",
    keyPair.privateKey
  );

  return { publicKey, privateKey };
}
