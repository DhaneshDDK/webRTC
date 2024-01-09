class peerService {
    constructor(){
        if(!this.peer){
            const configuration = {
                urls: [
                  "stun:stun.l.google.com:19302",
                  "stun:global.stun.twilio.com:3478",
                ],
              };

           this.peer = new RTCPeerConnection(configuration);
        }
    }


    //create offer
     async getOffer(){
        if(this.peer){
           const offer = await this.peer.createOffer();
           await this.peer.setLocalDescription(offer);
           return offer;
        }
     }

     //answer offer
     async getAnswer(offer){
        if(this.peer){
           await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
           const ans = await this.peer.createAnswer();
           await this.peer.setLocalDescription(ans);
           return ans;
        }
     }

     async setAnswerDescription(ans){
        if(this.peer){
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
     }
}

export default new peerService();