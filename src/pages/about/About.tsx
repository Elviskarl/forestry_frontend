import "./styles/index.css";
import downArrowUrl from "../../assets/down_arrow.svg";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const accordionHeaders = document.querySelectorAll<HTMLDivElement>(
      ".accordion-item-header",
    );

    const handlers = new Map<HTMLDivElement, () => void>();

    accordionHeaders.forEach((header) => {
      const handler = () => {
        const activeHeader = document.querySelector<HTMLDivElement>(
          ".accordion-item-header.active",
        );
        if (activeHeader && activeHeader !== header) {
          activeHeader.classList.toggle("active");
          const activeBody = activeHeader.nextElementSibling as HTMLDivElement;

          activeBody.style.maxHeight = "0px";
        }
        header.classList.toggle("active");

        const accordionItemBody = header.nextElementSibling as HTMLDivElement;

        if (header.classList.contains("active")) {
          accordionItemBody.style.maxHeight = `${accordionItemBody.scrollHeight}px`;
        } else {
          accordionItemBody.style.maxHeight = "0px";
        }
      };

      handlers.set(header, handler);
      header.addEventListener("click", handler);
    });

    return () => {
      handlers.forEach((handler, header) => {
        header.removeEventListener("click", handler);
      });
    };
  }, []);
  return (
    <section className="about-section-page">
      <div className="about-section-intro">
        <div className="about-section-card">
          <h3 className="section-title">About</h3>
          <p className="text">
            This interactive platform explores land-cover change within the Mau
            Forest Complex between 2000 and 2025. Using satellite imagery and
            remote sensing techniques, the project maps the distribution of
            major land-cover classes and examines how their extent has changed
            over time.
          </p>
          <p className="text">
            The results are presented through an interactive map, allowing users
            to explore spatial patterns, compare different years, and examine
            the area occupied by each land-cover class.
          </p>
        </div>
      </div>
      <div className="about-section-design-considerations">
        <div className="about-section-card">
          <h3 className="design-title">Design & Considerations</h3>

          <p className="text">
            This section outlines the key methodological and design decisions
            made throughout the project. It provides additional context on the
            data and methods used, the reasoning behind their selection, and the
            considerations that should be kept in mind when interpreting the
            results.
          </p>
          <ul className="accordion" role="list">
            <li className="accordion-item">
              <div className="accordion-item-header">
                <h5>Study period</h5>
                <div className="dropDownContainer">
                  <img src={downArrowUrl} alt="" />
                </div>
              </div>
              <div className="accordion-item-body">
                <div className="accordion-item-body-content">
                  <p className="text">
                    The study examines land-cover change within the Mau Forest
                    Complex from 2000 to 2025. This period was selected to
                    provide a 25-year perspective on changes in the landscape
                    while allowing comparisons across multiple points in time.
                  </p>
                  <p className="text">
                    A five-year interval was used to balance temporal detail
                    with the availability and consistency of suitable satellite
                    imagery. The analysis therefore considers six study years:
                    2000, 2005, 2010, 2015, 2020, and 2025.
                  </p>
                </div>
              </div>
            </li>

            <li className="accordion-item">
              <div className="accordion-item-header">
                <h5>Data selection</h5>
                <div className="dropDownContainer">
                  <img src={downArrowUrl} alt="" />
                </div>
              </div>
              <div className="accordion-item-body">
                <div className="accordion-item-body-content">
                  <p className="text">
                    Landsat satellite imagery was selected as the primary source
                    of data for the land-cover classification. Its long-term
                    archive and consistent 30-metre spatial resolution makes it
                    well suited for analyzing changes over the study period.
                  </p>
                  <p className="text">
                    Different Landsat missions were used to accommodate the
                    available imagery across the study period, including Landsat
                    5, Landsat 7, and Landsat 8. Surface reflectance products
                    were used to provide imagery suitable for spectral analysis
                    and comparison between study years.
                  </p>
                  <p className="text">
                    Additional topographic data were also incorporated into the
                    classification. Elevation and slope were derived from the
                    SRTM digital elevation model and used alongside the
                    satellite imagery to provide information about terrain that
                    could help distinguish between land-cover classes.
                  </p>
                </div>
              </div>
            </li>

            <li className="accordion-item">
              <div className="accordion-item-header">
                <h5>Image Selection & Pre-processing</h5>
                <div className="dropDownContainer">
                  <img src={downArrowUrl} alt="" />
                </div>
              </div>
              <div className="accordion-item-body">
                <div className="accordion-item-body-content">
                  <p className="text">
                    To improve consistency between study years, imagery was
                    selected between January and June. This period provides a
                    larger pool of images from which to construct composites,
                    helping to maintain complete spatial coverage after cloud
                    and cloud-shadow masking, which can otherwise introduce gaps
                    in the imagery.
                  </p>
                  <p className="text">
                    Before classification, the imagery was pre-processed to
                    reduce the effects of clouds, cloud shadows, and other
                    unwanted pixels. Surface reflectance values were also
                    appropriately scaled before the spectral bands and derived
                    indices were used as inputs to the classification.
                  </p>
                  <p className="text">
                    A median composite was used to combine the available images
                    for each period. This approach helps reduce the influence of
                    remaining anomalous pixels and produces a representative
                    image for each study year rather than relying on a single
                    satellite observation.
                  </p>
                </div>
              </div>
            </li>

            <li className="accordion-item">
              <div className="accordion-item-header">
                <h5>Classification method</h5>
                <div className="dropDownContainer">
                  <img src={downArrowUrl} alt="" />
                </div>
              </div>
              <div className="accordion-item-body">
                <div className="accordion-item-body-content">
                  <p className="text">
                    A supervised Random Forest classifier was used to classify
                    the study area into five major land-cover classes: water,
                    forest, herbaceous vegetation, urban, and bare soil.
                  </p>
                  <p className="text">
                    Training samples representing each land-cover class were
                    used to train the classifier, which then assigned each pixel
                    to the class with the most likely characteristics based on
                    the available input features. The same classification
                    framework was applied across the study years to provide a
                    consistent basis for comparison.
                  </p>
                </div>
              </div>
            </li>

            <li className="accordion-item">
              <div className="accordion-item-header">
                <h5>Classification features</h5>
                <div className="dropDownContainer">
                  <img src={downArrowUrl} alt="" />
                </div>
              </div>
              <div className="accordion-item-body">
                <div className="accordion-item-body-content">
                  <p className="text">
                    The classification was based on a combination of spectral,
                    derived, and topographic features. In addition to the
                    Landsat surface-reflectance bands, spectral indices were
                    calculated to provide additional information about specific
                    land-cover characteristics.
                  </p>
                  <p className="text">
                    The indices used included NDVI for vegetation, NDBI for
                    built-up areas, and MNDWI for water. EVI or SAVI was also
                    incorporated where appropriate for the respective Landsat
                    sensor. Elevation and slope were included as topographic
                    features to provide additional information about the
                    terrain.
                  </p>
                </div>
              </div>
            </li>

            <li className="accordion-item">
              <div className="accordion-item-header">
                <h5>Accuracy assessment</h5>
                <div className="dropDownContainer">
                  <img src={downArrowUrl} alt="" />
                </div>
              </div>
              <div className="accordion-item-body">
                <div className="accordion-item-body-content">
                  <p className="text">
                    The performance of each land-cover classification was
                    evaluated using independent validation samples that were
                    separated from the samples used to train the classifier.
                    Approximately 70% of the samples were used for training,
                    while the remaining 30% were reserved for validation.
                  </p>
                  <p className="text">
                    Classification performance was assessed using the overall
                    accuracy and Kappa coefficient, alongside the confusion
                    matrix. These measures provide an indication of how reliably
                    the classifier distinguished between the different
                    land-cover classes and help identify classes that were more
                    difficult to distinguish.
                  </p>
                </div>
              </div>
            </li>

            <li className="accordion-item">
              <div className="accordion-item-header">
                <h5>Area calculation</h5>
                <div className="dropDownContainer">
                  <img src={downArrowUrl} alt="" />
                </div>
              </div>
              <div className="accordion-item-body">
                <div className="accordion-item-body-content">
                  <p className="text">
                    The area occupied by each land-cover class was calculated
                    from the classified imagery using the area of individual
                    pixels. Pixel areas were summed according to their assigned
                    land-cover class to determine the total area represented by
                    each class within the study area.
                  </p>
                  <p className="text">
                    The resulting measurements were converted to hectares and
                    used to compare the spatial extent of each land-cover class
                    across the study years. These estimates provide a
                    quantitative basis for examining how the distribution of the
                    classified land-cover classes has changed over time.
                  </p>
                </div>
              </div>
            </li>

            <li className="accordion-item">
              <div className="accordion-item-header">
                <h5>Limitations and considerations</h5>
                <div className="dropDownContainer">
                  <img src={downArrowUrl} alt="" />
                </div>
              </div>
              <div className="accordion-item-body">
                <div className="accordion-item-body-content">
                  <p className="text">
                    The results of the analysis should be interpreted with
                    consideration of the limitations associated with
                    satellite-based land-cover classification. The 30-metre
                    spatial resolution of Landsat imagery can make it difficult
                    to distinguish small or closely distributed land-cover
                    features, while spectrally similar classes may also be
                    difficult for the classifier to separate.
                  </p>
                  <p className="text">
                    Differences between Landsat sensors, image availability,
                    atmospheric conditions, and the effectiveness of cloud and
                    cloud-shadow masking can introduce variation between study
                    years. Classification errors may therefore contribute to
                    apparent changes in the extent of individual land-cover
                    classes.
                  </p>
                  <p className="text">
                    Consequently, changes observed in the results represent
                    changes in the classified land-cover area and should not
                    necessarily be interpreted as direct evidence of actual
                    land-cover conversion on the ground. The results are best
                    used to identify broad spatial and temporal patterns that
                    can support further investigation and interpretation.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="about-section-credits">
        <div className="about-section-card">
          <h3 className="credits-title">Credits</h3>
          <p className="text">
            This web application was developed as an entry for the 2026 Map
            Competition, organized by the Regional Centre for Mapping of
            Resources for Development (RCMRD).
          </p>
          <p className="text">
            Resources used in this project were sourced from various platforms,
            including:
          </p>
          <span className="link-to-resources">
            Icons
            <a
              href="https://ionic.io/ionicons"
              title="Ionicons"
              className="link-tags"
              target="_blank"
            >
              Ionicons - Ionic Team
            </a>
          </span>
          <span className="link-to-resources">
            Map tiles -{" "}
            <a
              href="https://welcome.openstreetmap.org/what-is-openstreetmap/"
              title="openstreetmap"
              target="_blank"
              className="link-tags"
            >
              OpenStreetMap - OpenStreetMap contributors
            </a>
          </span>
          <span className="link-to-resources">
            Spatial Querrying -{" "}
            <a
              href="https://turfjs.org/"
              title="turfjs"
              className="link-tags"
              target="_blank"
            >
              Turf.js - Turf.js Contributors
            </a>
          </span>
          <span className="link-to-resources">
            Counties data -{" "}
            <a
              href="https://opendata.rcmrd.org/datasets/2c55f3ad7ee847e99b70e3b7e1efee7c/about"
              target="_blank"
              title="counties-data"
              className="link-tags"
            >
              RCMRD Open Data
            </a>
          </span>
          <span className="link-to-resources">
            Forest reserves data -{" "}
            <a
              href="https://rcoe-geoportal.rcmrd.org/maps/8e201758cbf44bbc82f3caa76138d3d6"
              title="forest reserves"
              className="link-tags"
              target="_blank"
            >
              RCoE Geoportal
            </a>
          </span>
          <span className="link-to-resources">
            Remote sensing & geospatial processing -{" "}
            <a
              href="https://earthengine.google.com/"
              title="Google earth"
              className="link-tags"
              target="_blank"
            >
              Google earth engine
            </a>
          </span>
          <span className="link-to-resources">
            Server Hosting -{" "}
            <a
              href="https://render.com/"
              title="Render"
              className="link-tags"
              target="_blank"
            >
              Render
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
