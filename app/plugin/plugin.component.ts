import { Component, Input } from  '@angular/core'

@Component({
    selector: 'plugin',
    templateUrl: 'app/plugin/plugin.component.html',
})
export class PluginComponent {
    baseUrl : string = "http://player.twitch.tv/?channel="
    @Input() channelUrl : string;
    
    //constructor(private userChannel: string) {
    constructor() {
        // let userChannel = "avilo"
        // this.channelUrl = this.baseUrl + userChannel
    }
}