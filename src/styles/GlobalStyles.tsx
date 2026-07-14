import { Global, css } from '@emotion/react'

const styles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family:
      'Pretendard',
      system-ui,
      -apple-system,
      'Segoe UI',
      Roboto,
      sans-serif;
    color: #1a1a1a;
    background-color: #fafafa;
  }

  a {
    color: inherit;
  }
`

export function GlobalStyles() {
  return <Global styles={styles} />
}
