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

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`

export function GlobalStyles() {
  return <Global styles={styles} />
}
