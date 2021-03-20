import React from "react";
import { icons } from "../assets/icons";
import logo from "../assets/logo.png";

const About = () => {
  return (
    <div className="about">
      <table className="about-table">
        <tbody>
          <tr>
            <td className="about-image">
              <img src={logo} height="200px" alt="" loading="lazy" />
            </td>
            <td>
              <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
              <hr />
              Vivamus dapibus, turpis convallis dapibus viverra, massa nunc
              auctor odio, eget varius turpis odio et massa. Phasellus sed
              dictum tortor. Aenean quis ex ex. Praesent sed risus et ligula
              consequat sollicitudin. In diam odio, sodales nec libero ut,
              posuere laoreet purus. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus.
              <table>
                <tbody>
                  <tr>
                    <td>{icons.atIcon()}</td>
                    <td>
                      <h4>www.petshop.com</h4>
                    </td>
                    <td>&nbsp;-&nbsp;</td>
                    <td>{icons.mailIcon()}</td>
                    <td>
                      <h4>sales@petshop.com</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default About;
