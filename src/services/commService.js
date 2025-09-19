import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";

class CommService {
  constructor() {
    this.rtcClient = null;
    this.localTracks = [];
    this.remoteUsers = {};
    this.tokenRefreshInterval = null;

    this.rtmClient = null;
    this.rtmChannel = null;
    this.rtmListeners = [];
  }

  //-----------------------------------------------------------Video Call Service-----------------------------------------------------------
  initRTC() {
    if (!this.rtcClient) this.rtcClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    console.log("initiaited");
    
  }

  async joinRTC({ appId, channelName, uid, token }, localContainerId = "local-player", remoteContainerId = "remote-container") {
    this.initRTC();

      if (this.rtcClient.connectionState === "CONNECTED" || this.rtcClient.connectionState === "CONNECTING") {
        console.warn("Already connected or connecting to a channel");
        return; // skip join
      }

    await this.rtcClient.join(appId, channelName, token, uid);

    const micTrack = await AgoraRTC.createMicrophoneAudioTrack();
    const camTrack = await AgoraRTC.createCameraVideoTrack();
    this.localTracks.push(micTrack, camTrack);

    await this.rtcClient.publish(this.localTracks);
    camTrack.play(localContainerId);

    // Remote user events
    this.rtcClient.on("user-published", async (user, mediaType) => {
      await this.rtcClient.subscribe(user, mediaType);
      const id = `remote-player-${user.uid}`;
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement("div");
        el.id = id;
        el.className = "remote-video";
        document.getElementById(remoteContainerId).appendChild(el);
      }
      if (mediaType === "video") user.videoTrack.play(id);
      if (mediaType === "audio") user.audioTrack.play();
      this.remoteUsers[user.uid] = user;
    });

    this.rtcClient.on("user-unpublished", user => {
      const id = `remote-player-${user.uid}`;
      const el = document.getElementById(id);
      if (el) el.remove();
      delete this.remoteUsers[user.uid];
    });

    return { micTrack, camTrack };
  }

  async leaveRTC(localContainerId = "local-player", remoteContainerId = "remote-container") {

      if (!this.rtcClient) return;


    this.localTracks.forEach(track => track.close());
    await this.rtcClient.leave();

    this.localTracks = [];
    this.remoteUsers = {};

    // Clean DOM
    const localEl = document.getElementById(localContainerId);
    if (localEl) localEl.innerHTML = "";
    const remoteEl = document.getElementById(remoteContainerId);
    if (remoteEl) remoteEl.innerHTML = "";

    this.rtcClient.off("user-published");
    this.rtcClient.off("user-unpublished");

    // Clear token refresh if any
    if (this.tokenRefreshInterval) clearInterval(this.tokenRefreshInterval);
  }

  // Optional: auto-refresh token
  startTokenRefresh(fetchTokenFn, interval = 30 * 60 * 1000) {
    this.tokenRefreshInterval = setInterval(async () => {
      const { token } = await fetchTokenFn();
      this.rtcClient.renewToken(token);
    }, interval);
  }


  
  //------------------------------------------------------------Text chatting--------------------------------------------------------------
   // 🔹 RTM SETUP (new)
  async initRTM(appId, uid) {

    
    if (!this.rtmClient) {
      this.rtmClient = AgoraRTM.createInstance(appId);
    }
  }

async loginRTM({appId, uid, token}) {
  
    await this.initRTM(appId, uid);
    await this.rtmClient.login({ uid: String(uid), token });
    console.log(`RTM logged in as ${uid}`);
  }

  async joinRTMChannel(channelName) {
    if (!this.rtmClient) throw new Error("RTM client not initialized");
    this.rtmChannel = await this.rtmClient.createChannel(channelName); // ✅ now valid
    await this.rtmChannel.join();
    console.log(`Joined RTM channel ${channelName}`);

    // Listen for channel messages
    this.rtmChannel.on("ChannelMessage", ({ text }, senderId) => {
      this.rtmListeners.forEach((cb) => cb({ senderId, text }));
    });
  }

  async sendMessage(text) {
    if (!this.rtmChannel) throw new Error("Not in RTM channel");
    await this.rtmChannel.sendMessage({ text });
  }

  onMessage(callback) {
    this.rtmListeners.push(callback);
  }

  async leaveRTM() {
    if (this.rtmChannel) {
      await this.rtmChannel.leave();
      this.rtmChannel = null;
    }
    if (this.rtmClient) {
      await this.rtmClient.logout();
      this.rtmClient = null;
    }
    this.rtmListeners = [];
  }

}

export default new CommService();
