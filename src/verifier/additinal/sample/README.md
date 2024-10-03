# Verify Configuration File (verifyConfig.json)

This JSON file contains configuration settings for the verification process in our project.

## Structure

The configuration file has three main sections:

1. `baseSettings`: Default settings applied to all verifications.
2. `overrideSettings`: Specific settings to override defaults for particular credIds.
3. `defaultEndpoint`: Template for generating verification endpoints.

### baseSettings

- `address`: The default Ethereum address used for verification.
- `verificationSource`: The default GitHub repository URL for the verification source.

### overrideSettings

An array of objects, each containing:

- `credId`: The credential ID to apply specific settings to.
- Other fields to override (e.g., `endpoint`, `verificationSource`).

### defaultEndpoint

A string template for generating verification endpoints. Use `{configId}` as a placeholder for the actual config ID.

## Resource

Please check output/cred_art_results.json and check credid for each credConfig.

## Example

```json
{
  "baseSettings": {
    "address": "0x1234567890123456789012345678901234567890", <- should be changed to verifier address
    "verificationSource": "https://github.com/example/verify-source"
  },
  "overrideSettings": [
    {
      "credId": 0,
      "endpoint": "https://example.com/api/verify/0"
    },
    {
      "credId": 32,
      "verificationSource": "https://github.com/example/special-verify-source-32"
    }
  ],
  "defaultEndpoint": "https://example.com/api/verify/{credId}"
}
```

## Usage

This configuration file is used by the verification system to determine the correct settings for each credential. The system will use the `baseSettings` by default, apply the `defaultEndpoint` template, and then override with any specific settings found in `overrideSettings` for the given credId.

To modify the configuration, simply edit this JSON file. No code changes are required for most configuration updates.
