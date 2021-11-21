Moralis.Cloud.beforeSave("Articles", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("here in articles Minted");

  const uri = request.object.get("uri");

  logger.info(`uri result:${uri}`);

  if (uri) {
    Moralis.Cloud.httpRequest({
      method: "GET",
      url: `https://ipfs.moralis.io:2053/ipfs/${uri.replace("ipfs://", "")}`,
    }).then(
      function (httpResponse) {
        logger.info("response status:");
        logger.info(httpResponse.status);
        logger.info("response content:");
        logger.info(httpResponse.text);
        const data = JSON.parse(httpResponse.text);
        request.object.set("name", String(data.name));
        request.object.set("description", String(data.description));
        request.object.set("image", String(data.image));
      },
      function (httpResponse) {
        // error
        logger.error(
          "Request failed with response code " + httpResponse.status
        );
      }
    );
  } else {
    logger.error("failed to set");
  }
  return true;
});
