import React, { Component } from "react";

function Footer(props)  {

    return (
        <footer class="footer-area section_gap">
          <div class="container">
            <div class="row">
              <div class="col-lg-3  col-md-6 col-sm-6">
                <div class="single-footer-widget">
                  <h6 class="footer_title">About Us</h6>
                  <p className="text-justify">
                  Azach is not your everyday fashion brand, Azach is versatility, Azach is a culture,  Azach is functional, Azach is the brand that caters that your everyday fashion needs with it's own uniqueness.

                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="single-footer-widget">
                  <h6 class="footer_title">Our Customer Care</h6>
                  <p>Stay updated with our latest trends and reach out to us</p>
                  <div id="mc_embed_signup">
                    <form
                    onSubmit={(e) => e.preventDefault() }
                    >
                      <div class="input-group d-flex flex-row">
                        <input
                          name="EMAIL"
                          placeholder="Email Address"
                          required=""
                          type="email"
                        />
                        <button class="btn sub-btn">
                          <span class="lnr lnr-arrow-right" />
                        </button>
                      </div>
                      <div class="mt-10 info" />
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-footer-widget instafeed">
                  <h6 class="footer_title">Azach Instagram Page</h6>
                  <ul class="list instafeed d-flex flex-wrap">
                    <li>
                      <img src="img/instagram/Image-01.jpg" alt="" />
                    </li>
                    <li>
                      <img src="img/instagram/Image-02.jpg" alt="" />
                    </li>
                    <li>
                      <img src="img/instagram/Image-03.jpg" alt="" />
                    </li>
                    <li>
                      <img src="img/instagram/Image-04.jpg" alt="" />
                    </li>
                    <li>
                      <img src="img/instagram/Image-05.jpg" alt="" />
                    </li>
                    <li>
                      <img src="img/instagram/Image-06.jpg" alt="" />
                    </li>
                    <li>
                      <img src="img/instagram/Image-07.jpg" alt="" />
                    </li>
                    <li>
                      <img src="img/instagram/Image-08.jpg" alt="" />
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-2 col-md-6 col-sm-6">
                <div class="single-footer-widget f_social_wd">
                  <h6 class="footer_title">Follow Us</h6>
                  <p>Let us be social</p>
                  <div class="f_social">
                    <a href="#">
                      <i class="fa fa-facebook" />
                    </a>
                    <a href="#">
                      <i class="fa fa-twitter" />
                    </a>
                    <a href="#">
                      <i class="fa fa-instagram" />
                    </a>

                  </div>
                </div>
              </div>
            </div>
      
          </div>
        </footer>

    );
  }

export default Footer;
