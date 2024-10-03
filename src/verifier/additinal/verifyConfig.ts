import { Address } from 'viem';
import fs from 'fs';
import path from 'path';
import { VerifySetting } from '../../utils/types';

// Load configuration
const configPath = path.join(__dirname, 'verifyConfig.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const RESULTS_FILE = path.join(__dirname, 'output', 'cred_art_results.json');

const tempVerifySettings = getVerifySettings();

function loadExistingResults(): { configId: number; credId: number; artId?: number }[] {
  if (fs.existsSync(RESULTS_FILE)) {
    const data = fs.readFileSync(RESULTS_FILE, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

export const baseSettings = {
  address: config.baseSettings.address as Address,
  verificationSource: config.baseSettings.verificationSource,
};

export function getVerifySettings(): VerifySetting[] {
  const existingResults = loadExistingResults();

  return existingResults.map((result) => ({
    credId: result.credId,
    endpoint: config.defaultEndpoint.replace('{configId}', result.configId.toString()),
    ...baseSettings,
  }));
}

export const verifySettings = tempVerifySettings.map((setting) => {
  const override = config.overrideSettings.find((o) => o.credId === setting.credId);
  return override ? { ...setting, ...override } : setting;
});
