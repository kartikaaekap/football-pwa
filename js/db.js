var dbPromised = idb.open("football-pwa", 1, function(upgradeDb) {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamsObjectStore.createIndex("post_title", "post_title", { unique: false });
  });
  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.put(team.result);
        return tx.complete;
      })
      .then(function() {
        console.log("Favorite team berhasil di simpan.");
      });
  }