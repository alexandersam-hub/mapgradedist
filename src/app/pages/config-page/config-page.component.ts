import { Component } from '@angular/core';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.css']
})
export class ConfigPageComponent {
  // currentPage: string = "game"
  currentPage: string = "game"
  setActivePage(activePage: string) {
    this.currentPage = activePage
  }

  goToBottomPage() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
}
