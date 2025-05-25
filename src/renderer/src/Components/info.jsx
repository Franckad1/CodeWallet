import PropTypes from 'prop-types'

const Info = ({ classType }) => {
  return (
    <div className="info-container">
      <h1>About the Application</h1>

      <section>
        <h2>Features</h2>
        <ul>
          <li>Organize code snippets by categories and tags</li>
          <li>Syntax highlighting for multiple programming languages</li>
          <li>
            Quick navigation with keyboard shortcuts:
            <ul>
              <li>
                <kbd id={classType}>Ctrl + F</kbd> : Home
              </li>
              <li>
                <kbd id={classType}>Ctrl + T</kbd> : Tags
              </li>
              <li>
                <kbd id={classType}>Ctrl + I</kbd> : Info
              </li>
              <li>
                <kbd id={classType}>Ctrl + N</kbd> : New Fragment
              </li>
              <li>
                <kbd id={classType}>Ctrl + D</kbd> : Toggle Theme
              </li>
            </ul>
          </li>
          <li>Fast and minimalist interface built with Electron</li>
        </ul>
      </section>

      <section>
        <h2>Development Team</h2>
        <p>This app was developed by:</p>
        <ul>
          <li>Meugue Ada</li>
          <li>Helped: Jean-Christophe</li>
          <li>Supervisor: Thierry</li>
        </ul>
      </section>

      <section>
        <h2>Legal Notice</h2>
        <p>
          This software is an educational tool and does not collect personal data. Any commercial
          use requires prior written consent from the development team.
        </p>
      </section>

      <section>
        <h2>Source Code</h2>
        <p>
          The source code is available on GitHub: <br />
          <a
            style={{ color: 'white', textDecoration: 'none', fontSize: '10px' }}
            href="https://github.com/Franckad1/CodeWallet"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/Franckad1/CodeWallet
          </a>
        </p>
      </section>
    </div>
  )
}

Info.propTypes = {
  classType: PropTypes.string
}

export default Info
