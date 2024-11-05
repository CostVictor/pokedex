import { Component } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isThemeDark = false
  openMenu = false

  constructor(private _themes: ThemeService) { }

  ngOnInit() {
    this._themes.themeIsDark$
      .subscribe({ next: (value) => { this.isThemeDark = value } })
  }

  changeTheme(value: boolean) {
    this._themes.themeDark = value
  }
}
