import fetchApi from "../../lib/fetch";
import { getEnvValue } from "../../lib/env";

import { basicResponseDecoder } from "italia-ts-commons/lib/requests";
import { ServerInfo } from "../../generated/definitions/backend/ServerInfo";

const decoder = basicResponseDecoder(ServerInfo);

describe.only("getServerInfo", () => {
  const host = getEnvValue("IO_BACKEND_HOST").getOrElseL(() => {
    throw new Error(`required value dor "IO_BACKEND_HOST"`);
  });
  const endpoint = `${host}/info`;

  it("should correctly expose server info", async () => {
    const headers = {};
    const expectedHttpCode = 200;

    const client = (): Promise<Response> => fetchApi(endpoint, { headers });

    const response = await client();

    expect(response.status).toBe(expectedHttpCode);

    const decoded = await decoder(response);

    expect(decoded).toBeDefined();
    if (decoded) {
      const rightFormat = decoded.fold<boolean>(
        _ => false,
        _ => true
      );
      expect(rightFormat).toBe(true);
    } else {
      throw new Error(`Expected response to be in the correct format`);
    }
  });
});
