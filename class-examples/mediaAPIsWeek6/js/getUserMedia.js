window.onload = getLiveVideo;

async function getLiveVideo() {
    console.log("loaded");
    let video = document.getElementById("video");
    console.log(video.srcObject);

    try { //try to access the media from user camera = if not possible will send you to the catch statement
        //await = tell js to wait for this to happen before doing the next thing 
        let stream = await navigator.mediaDevices.getUserMedia({ //video stream + size

            video: { //video object is streamed video directly into code
                width: 320,
                height: 240,
            },
        });
        video.srcObject = stream;
        console.log(video.srcObject) //here there is something
    } catch (err) { //user must allow camera access = must account if user doesnt allow
        /* handle the error */
        console.log("had an error getting the camera");
    }
}