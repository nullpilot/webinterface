import CryptoJS from "crypto-js";

import FileProcessor from "./file-processor";

test("file |> fileToChunks |> chunksToFile - Success", done => {
  const handle = "super-secret-key";
  const ogFileContents = "test123-".repeat(2187);
  const file = new File([ogFileContents], "testFile.txt");

  FileProcessor.fileToChunks(file, handle)
    .then(encryptedChks => FileProcessor.chunksToFile(encryptedChks, handle))
    .then(decryptedBlob => FileProcessor.readBlob(decryptedBlob))
    .then(reassembledFileContent => {
      expect(reassembledFileContent).toEqual(ogFileContents);
      done();
    })
    .catch(err => {
      expect(err).toBeFalsy();
      done();
    });
});

test("file |> fileToChunks |> chunksToFile - Success w/ treasure", done => {
  const handle = "super-secret-key";
  const ogFileContents = "test123-".repeat(1);
  const file = new File([ogFileContents], "testFile.txt");
  const numTreasure = 5;

  FileProcessor.fileToChunks(file, handle)
    .then(encryptedChunks => {
      // Insert treasure into randomly into chunks.
      for (let i = 0; i < numTreasure; i++) {
        let treasureIdx = Math.floor(Math.random() * encryptedChunks.length);
        encryptedChunks.splice(treasureIdx, 0, "TREASURE");
      }
      console.log(encryptedChunks);

      return FileProcessor.chunksToFile(encryptedChunks, handle);
    })
    .then(decryptedBlob => FileProcessor.readBlob(decryptedBlob))
    .then(reassembledFileContent => {
      expect(reassembledFileContent).toEqual(ogFileContents);
      done();
    })
    .catch(err => {
      expect(err).toBeFalsy();
      done();
    });
});
