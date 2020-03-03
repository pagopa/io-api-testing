import { ensure as ensureEnvValue } from "../../lib/env";
import {
  testInvalidToken,
  testNoToken
} from "../../lib/helpers/testUnauthorized";

describe("getUserProfile", () => {
  const host = ensureEnvValue("IO_BACKEND_HOST");
  const basePath = ensureEnvValue("IO_BACKEND_BASEPATH");
  const endpoint = `${host}${basePath}/profile`;

  testNoToken(it, endpoint);
  testInvalidToken(it, endpoint);
});
