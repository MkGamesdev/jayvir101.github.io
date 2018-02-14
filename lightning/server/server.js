var server = {
    id:(Math.floor(Math.random() * 90000) + 10000),
    send:function(to,code) {
        firebase.database().ref("Data").set({
            From:server.id,
            To:to,
            Code:code,
            TimeStamp:Date.now()
        });
    },
    login:function(email,password) {
        firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
            alert(error);
        });
    },
    logout:function() {
      firebase.auth().signOut();  
    },
    onreceive:null,
    onpresence_added:null,
    onpresence_removed:null
};

window.onload = function() {
    firebase.database().ref("Presence").on("child_removed", function(snapshot) {
        server.onpresence_removed(snapshot);
    });

    firebase.database().ref("Presence").on("child_added", function(snapshot) {
        server.onpresence_added(snapshot);
    });
}

firebase.database().ref("Presence/" + server.id).set({id:server.id});
firebase.database().ref("Presence/" + server.id).onDisconnect().remove();

firebase.database().ref().on("child_changed",function(snapshot) {
    if(snapshot.key == "Data" && (snapshot.val().To == server.id || snapshot.val().To == "all")) {
       server.onreceive(snapshot);
    }
});
