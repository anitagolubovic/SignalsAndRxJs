import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "welcome-component",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
  imports: [NgOptimizedImage]
})
export class WelcomeComponent {
    title: string = "Welcome to Signals and RxJs demo application!";
    subtitle: string = "Student: Anita Golubovic"
}