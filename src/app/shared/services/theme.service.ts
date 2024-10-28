import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _themeDark = new BehaviorSubject<boolean>(false)

  private _detectThemeInLocalStorage() {
    // Obtem o tema do localStorage.
    const themeUser = localStorage.getItem("themeUser")
    if (themeUser) {
      return themeUser === "dark"
    }
    return null
  }

  private _detectUserPreferredTheme() {
    // Verifica se o usuário prefere dark.
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  get theme$(): Observable<boolean> {
    return this._themeDark.asObservable()
  }

  set themeDark(value: boolean | null) {
    if (value === null) {
      // Remove o save do tema e aplica o padrão do navegador.
      localStorage.removeItem("themeUser")
      this._themeDark.next(this._detectUserPreferredTheme())
    } else {
      this._themeDark.next(value)
    }
  }

  ngOnInit() {
    // Verifica se o usuário possui algum tema salvo, caso contrário, usa sua preferência do navegador.
    const isThemeDark = this._detectThemeInLocalStorage() ?? this._detectUserPreferredTheme()
    this._themeDark.next(isThemeDark)

    // Aplica o tema na página.
    const body = document.body
    body.classList.toggle("theme-dark", isThemeDark)
  }
}
