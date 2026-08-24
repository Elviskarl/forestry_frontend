import { useContext } from "react";
import * as turf from "@turf/turf";
import { ShapefileContext } from "../../../context/createShapefileContext";
import MiniMap from "../../../components/mini-map/MiniMap";
import StatsTable from "./StatsTable";
import forestBlockUrl from "../../../assets/forest_blocks.jpg";
import labourControlUrl from "../../../assets/labour_control.jpg";
import openLinkUrl from "../../../assets/open-link.svg";

import settlementSchemesUrl from "../../../assets/settlement_schemes.jpg";
import ImageContainer from "./ImageContainer";
import CitationLink from "./CitationLink";

function Main() {
  const { target_counties, mau_forest } = useContext(ShapefileContext)!;

  if (!target_counties || !mau_forest) return;

  return (
    <main>
      <section className="introduction">
        <h1 className="introduction-heading">Mau Forest</h1>
        <h3>Introduction</h3>
        <div className="introduction-content">
          <div className="introduction-text">
            <p className="text">
              The mau forest complex is the largest closed-canopy montane
              tropical forest in East africa. Straddling{" "}
              {target_counties.features.length} counties covering approximately
              ~ {(turf.area(mau_forest) / 10000).toLocaleString()} ha, it serves
              as a catchment for rivers west of the Great Rift Valley.
            </p>
            <p className="text">
              It comprises of 22 forest blocks, 21 of which are managed by the
              Kenya forest service with the Maasai trust land forest being an
              exception which is managed by the Narok county government. Of
              these are 16 contiguous forests and 6 separate satellite forests.
            </p>
            <p className="text">
              But this was not always the case. The forest has witnessed a long,
              protracted and contentious history of human habitation. A key
              theme that emerges in this analysis is the question of who creates
              and controls forest data in particular, maps.
            </p>
          </div>
          <ImageContainer
            url={forestBlockUrl}
            attr="Forest blocks"
            citation={{ id: "one", position: 1 }}
          />
        </div>
      </section>
      <section className="background">
        <h3>Historical background</h3>
        <p className="text">
          To understand the forest as it exists today, it important to
          understand the conditions that shaped it in the past.
        </p>
        <div className="introduction-content">
          <div className="introduction-text">
            <p className="text">
              The establishment of British colonial rule in Kenya was
              accompanied by designation of much of the country as crown land.
              Large areas of fertile land in the rift valley were incorporated
              into the "White highlands" and allocated to European settlers.
              Indigenous communities were relocated to ethnically defined
              reserves , while many others remained on settler farms as
              squatters, providing labour in exchange for the right to cultivate
              land.
              <CitationLink id={"one"} position={1} />
              <br />
              <br />
              At the same time, large tracts of forest were gazetted as forest
              reserves resulting in the displacement of communities in the name
              of conservation and the public interest. Together, these policies
              resulted in widespread land dispossession and inequality, fueling
              tensions that intensified after the second world war. This
              culminated in an armed anti-colonial movement under the name of
              Land and Freedom Army, which came to be known among the settler
              community as the Mau Mau.
              <CitationLink id={"two"} position={2} />
            </p>
            <p className="text">
              With the approach of independence, the British government and the
              colonial administration introduced a land market for settlers who
              wanted to sell their farms. The Kenyan Government, using loans
              provided by the British Government and world bank, bought most of
              them. The story of land distribution under settlement schemes, is
              largely the story of what happened to these lands.
              <CitationLink id={"two"} position={2} />
            </p>
          </div>
          <ImageContainer
            url={labourControlUrl}
            attr="Labourers cultivating land"
            citation={{ id: "three", position: 3 }}
          />
        </div>
        <div className="introduction-content">
          <div className="introduction-text">
            <p className="text">
              Following independence, the post colonial state continued to play
              a central role in controlling access to forest land, often using
              it to reinforce political patronage. During the Moi
              administration, many settlers who had occupied parts of the mau
              forest under the reign of his predecessor were evicted and
              re-occupied by communities aligned to him.
              <CitationLink id={"four"} position={4} />
              <br />
              <br />
              Large areas of the Mau forest complex and other forest reserves
              were excised and converted into settlement schemes. While these
              schemes were presented as mechanisms for land distribution, they
              would also serve to legitimize settlement in the reserves and turn
              it into a cover for massive and irregular appropriations.
              <CitationLink id={"four"} position={4} />
            </p>
            <p className="text">
              Owing to the numerous irregularities surrounding the Mau
              settlement schemes, the Government has placed caveats in many of
              the affected areas from 2002 onwards. As a result tens of
              thousands of residents have remained in a state of legal
              uncertainty, with unresolved questions over land ownership and
              tenure continuing to shape debates on conservation and settlement
              within the forest complex.
              <CitationLink id={"two"} position={2} />
            </p>
          </div>
          <ImageContainer
            url={settlementSchemesUrl}
            attr="settlement schemes in and around mau forest"
            citation={{ id: "two", position: 2 }}
          />
        </div>
      </section>
      <section className="new-era">
        <h3>
          21<sup>st</sup> century
        </h3>
        <p className="text">
          With the dawn of the twenty-first century, advances in remote sensing
          provided a new perspective from which to observe the Earth. Satellite
          imagery made it possible to monitor landscapes over time, offering a
          consistent and objective record of changes occurring on the earth's
          surface.
        </p>
        <p className="text">
          Among the most influential Earth observation missions is the Landsat
          programme, which has provided continuous satellite imagery of the
          Earth's surface for more than five decades. This extensive archive
          enables a spatiotemporal analysis of landscape change, allowing
          environmental processes to be observed across both space and time.
        </p>
        <h4>Study overview</h4>
        <p className="text">
          Building on this historical archive, this project examines how the Mau
          forest complex has changed over the past 25 years.
        </p>
        <p className="text">
          The year 2000 has been chosen as the baseline of this analysis. It
          marks the starting point from which changes in forest cover and land
          use can be measured.
        </p>
        <p className="text">
          To capture the progression of landscape change, observations are
          analyzed at <span className="important">5 year intervals</span>,
          allowing both gradual trends and periods of accelerated transformation
          to be identified.
        </p>
        <p className="text">
          To ensure complete spatial coverage, imagery for each observation year
          was taken between the months of January and June. The study area spans
          two overlapping landsat scenes and cloud masking often resulted in
          missing pixels within individual acquisitions. Using a 6 months
          observation window provided a sufficient number of cloud free images
          from both scenes to generate seamless composites while maintaining a
          consistent seasonal period across all years.
        </p>
      </section>
      <section className="spatial-analysis">
        <h3>25 years...</h3>
        <div className="introduction-content">
          <div className="introduction-text">
            <p className="text">
              Before beginning the analysis from our baseline, observations
              acquired prior to this provide valuable historical context. It
              offers a glimpse of the forest complex before many of the land
              cover changes analyzed in this study, serving as a visual
              reference against which the 21
              <sup>st</sup> century landscape can be understood.
            </p>
            <p className="text">
              A composite image generated from landsat 5 observations taken
              between 1984, when it became operational and 1986, provides the
              earliest visual record used in this study. Consequently it
              represents the greatest forest extent illustrated within this
              project.
            </p>
          </div>
          <div className="introduction-map">
            <MiniMap
              description="1984 composite image"
              url="/api/v1/tiles"
              data={{
                dataset: "landsat",
                year: 1984,
              }}
              purpose="single"
            />
          </div>
        </div>

        <p className="text">
          To enable consistent comparison across the study period, each
          observation year is accompanied by a land-cover classification derived
          from the corresponding Landsat composite. These classifications
          provide a quantitative assessment of the landscape by mapping the
          spatial distribution and extent of the major land-cover types within
          the study area.
        </p>
        <p className="text">
          Five land-cover classes are identified throughout the analysis:
          forest, herbaceous vegetation, urban areas, bare soil, and water.
          Together, they provide a consistent framework for measuring and
          comparing changes in the Forest Complex.
        </p>
        <p className="text">
          In this classification, herbaceous vegetation represents areas
          predominantly covered by non-woody vegetation, including grasses,
          crops, shrubs and other low-growing vegetation that do not meet the
          spectral characteristics used to identify forest.
        </p>
        <h4>2000</h4>
        <p className="text">
          The year 2000 marks the analytical baseline of the study. It also
          precedes the landmark 2002 general elections.
        </p>
        <p className="text">
          Compared with the 1984 - 1986 reference image, changes in forest cover
          are already evident, indicating that landscape transformation had
          begun well before the study period.
        </p>
        <div className="introduction-content">
          <div className="introduction-map">
            <MiniMap
              description="Comparison between 1984 and 2000 composite"
              url="/api/v1/tiles/comparisons"
              data={[
                {
                  dataset: "landsat",
                  year: 1984,
                },
                {
                  dataset: "landsat",
                  year: 2000,
                },
              ]}
              purpose="comparison"
            />
          </div>
          <div className="introduction-map">
            <MiniMap
              description="land cover and composite image for the year 2000"
              url="/api/v1/tiles/comparisons"
              data={[
                { dataset: "classification", year: 2000 },
                { dataset: "landsat", year: 2000 },
              ]}
              purpose="overlay"
            />
          </div>
        </div>

        <p className="text">
          From this composite image, a land cover classification map was
          generated generated to map the spatial distribution of the five
          land-cover classes across the study area.
        </p>

        <StatsTable year={2000} />
        <p className="text">
          The results show that forest is the most dominant land cover class
          accounting for the largest proportion of the study area. Herbaceous
          vegetation occupies much of the forest periphery, reflecting areas
          under cultivation and other non-forest vegetation. Urban areas, bare
          soil, and water bodies together comprise a relatively small proportion
          of the landscape.
        </p>
        <p className="text">
          This baseline provides the reference against which all subsequent
          observations are evaluated.
        </p>
        <h4>2005</h4>
        <p className="text">
          The year represents the first opportunity to evaluate changes from the
          established baseline. This assessment capture the early stages of
          landscape transformation, revealing how the land cover classes shifted
          over the first five years of the study.
        </p>
        <div className="introduction-content">
          <div className="introduction-map">
            <MiniMap
              url="/api/v1/tiles/comparisons"
              data={[
                { dataset: "classification", year: 2005 },
                { dataset: "landsat", year: 2005 },
              ]}
              purpose="overlay"
              description="land cover and composite image for the year 2005"
            />
          </div>
          <div className="introduction-table">
            <StatsTable year={2005} />
          </div>
        </div>

        <p className="text">
          The 2005 classification reveals a substantial change in the
          distribution of the two dominant land-cover classes. Forest cover
          increased from approximately 193,421 ha in 2000 to 237,384 ha in 2005,
          representing an increase of about 43,963 ha. Over the same period,
          herbaceous vegetation declined by approximately 44,438 ha, from
          181,644 ha to 137,205 ha.
        </p>
        <p className="text">
          The close correspondence between the decrease in forest and increase
          in herbaceous vegetation suggests that at least part of the observed
          change may represent areas transitioning between these two classes,
          whether through actual land-cover conversion, changes in vegetation
          condition, differences in image conditions, forest degradation, or the
          maturation and regeneration of vegetation. The observed increase
          should therefore be understood as a change in classified forest
          extent, rather than definitive evidence that an equivalent area of new
          forest was established during the time period.
        </p>
        <p className="text">
          The remaining classes also increased in mapped extent. Urban areas
          more than doubled from 15.38 ha to 35.13 ha, while bare soil increased
          from approximately 2 ha to 34 ha. Water increased slightly from 3.04
          ha to 6.17 ha. Although these classes occupy a relatively small
          proportion of the study area, their increase contributes to the
          overall change observed between the two assessment periods.
        </p>
        <h4>2010</h4>
        <p className="text">
          The year 2010 marks the second waypoint in the analysis and provides a
          further five years of observations. At this stage, the analysis moves
          beyond the initial changes observed in 2005, allowing us to examine
          whether those patterns persisted, intensified, or began to reverse.
        </p>
        <div className="introduction-content">
          <div className="introduction-map">
            <MiniMap
              purpose="overlay"
              data={[
                { dataset: "landsat", year: 2010 },
                { dataset: "classification", year: 2010 },
              ]}
              description="land cover and composite image for the year 2010"
              url="/api/v1/tiles/comparisons"
            />
          </div>
          <div className="introduction-table">
            <StatsTable year={2010} />
          </div>
        </div>
        <p className="text">
          The 2010 classification provides an important point of comparison to
          the substantial shift observed in 2005. Forest cover declined from
          237,384 ha in 2005 to 204,035 ha in 2010, a reduction of approximately
          33,349 ha. Over the same period, herbaceous vegetation increased from
          137,205 ha to 170,889 ha, reversing much of the change observed in the
          previous assessment. The increase in classified forest observed
          between 2000 and 2005 is not sustained in 2010.
        </p>
        <p className="text">
          Bare soil remained relatively limited in extent but increased from
          1.97 ha in 2000 to 40.41 ha in 2010. Urban areas, meanwhile, covered
          22.08 ha, slightly above the 2000 baseline but below the 2005
          estimate. Water remained a very small component of the classified
          landscape at 4.02 ha.
        </p>
        <h4>2015</h4>
        <p className="text">
          The year 2015 marks the midpoint of the twenty-five-year analysis and
          represents an important transition in the satellite record used for
          the study. Up to this point, the analysis has relied on observations
          from Landsat 5 and Landsat 7. From 2015 onward, Landsat 8 imagery is
          used.
        </p>
        <div className="introduction-content">
          <div className="introduction-map">
            <MiniMap
              purpose="overlay"
              data={[
                { dataset: "landsat", year: 2015 },
                { dataset: "classification", year: 2015 },
              ]}
              description="land cover and composite image for the year 2015"
              url="/api/v1/tiles/comparisons"
            />
          </div>
          <div className="introduction-table">
            <StatsTable year={2015} />
          </div>
        </div>
        <p className="text">
          The 2015 classification shows a further shift between the two dominant
          land-cover classes. Forest cover declined from 204,035 ha in 2010 to
          189,131 ha in 2015, a reduction of approximately 14,904 ha. Over the
          same period, herbaceous vegetation increased by approximately 14,822
          ha, from 170,889 ha to 185,711 ha. As in the previous assessment, the
          near-equivalent magnitude of these changes suggests that much of the
          observed variation occurs between the forest and herbaceous vegetation
          classes.
        </p>
        <p className="text">
          The pattern observed in 2005 is evident again, but in the opposite
          direction. The increase in classified forest extent between 2000 and
          2005 was accompanied by a near-equivalent decline in herbaceous
          vegetation. Between 2010 and 2015, the relationship is reversed, with
          a decline in classified forest extent accompanied by a corresponding
          increase in herbaceous vegetation.
        </p>
        <p className="text">
          Unlike the two dominant classes, the remaining land-cover classes show
          a marked increase in mapped extent. Bare soil increased from 40.41 ha
          to 94.13 ha, while urban areas increased from 22.08 ha to 87.16 ha.
          Water also increased considerably, from 4.02 ha to 61.95 ha. Although
          these classes remain small relative to forest and herbaceous
          vegetation, their increasing representation in the classification
          indicates a greater diversity of mapped land-cover types by 2015.
        </p>
        <h4>2020</h4>
        <p className="text">
          The year 2020 marks the fourth assessment in the twenty-five-year
          analysis and brings the study into its second decade of observation.
        </p>
        <div className="introduction-content">
          <div className="introduction-map">
            <MiniMap
              purpose="overlay"
              data={[
                { dataset: "landsat", year: 2020 },
                { dataset: "classification", year: 2020 },
              ]}
              description="land cover and composite image for the year 2020"
              url="/api/v1/tiles/comparisons"
            />
          </div>
          <div className="introduction-table">
            <StatsTable year={2020} />
          </div>
        </div>
        <p className="text">
          The 2020 classification marks another reversal in the relationship
          between the two dominant land-cover classes. Forest cover increased
          from 189,131 ha in 2015 to 206,749 ha in 2020, representing an
          increase of approximately 17,618 ha. Over the same period, herbaceous
          vegetation declined by approximately 18,104 ha, from 185,711 ha to
          167,607 ha. As observed in earlier intervals, the changes in the two
          classes are closely matched in magnitude, with an increase in
          classified forest extent accompanied by a corresponding reduction in
          herbaceous vegetation.
        </p>
        <p className="text">
          This recurring pattern reinforces the importance of interpreting the
          forest estimates alongside the other vegetation classes. The increase
          in classified forest extent may reflect genuine changes in vegetation,
          including regeneration or increased canopy density, but the
          possibility of classification variability and changes in vegetation
          condition cannot be excluded.
        </p>
        <p className="text">
          A more pronounced change is evident among the smaller land-cover
          classes. The area classified as urban increased from 87.16 ha in 2015
          to 384.58 ha in 2020, an increase of approximately 297 ha. Bare soil
          also increased from 94.13 ha to 233.59 ha, while water increased more
          modestly from 61.95 ha to 76.70 ha. The increases in areas classified
          as urban and bare soil should, however, be interpreted with caution.
          Visual inspection of the classification suggests that some areas
          identified as urban correspond to tilled agricultural land and other
          exposed surfaces, indicating that classification confusion may account
          for part of the apparent increase.
        </p>
        <h4>2025</h4>
        <p className="text">
          The year 2025 finally concludes the 25 year journey traced within this
          analysis. It provides an opportunity to step back from these
          individual changes and examine the broader trajectory of the Mau
          Forest Complex over the study period.
        </p>
        <div className="introduction-content">
          <div className="introduction-map">
            <MiniMap
              purpose="overlay"
              data={[
                { dataset: "landsat", year: 2025 },
                { dataset: "classification", year: 2025 },
              ]}
              description="land cover and composite image for the year 2025"
              url="/api/v1/tiles/comparisons"
            />
          </div>
          <div className="introduction-table">
            <StatsTable year={2025} />
          </div>
        </div>
        <p className="text">
          The 2025 classification concludes the twenty-five-year sequence with a
          further increase in classified forest extent. Forest cover increased
          from 206,749 ha in 2020 to 218,807 ha in 2025, an increase of
          approximately 12,057 ha. Over the same period, herbaceous vegetation
          declined by approximately 11,566 ha, from 167,607 ha to 156,040 ha. As
          observed in several of the preceding assessment periods, the changes
          in the two dominant classes are closely matched, with an increase in
          classified forest accompanied by a corresponding reduction in
          herbaceous vegetation.
        </p>
        <p className="text">
          The result continues the alternating pattern observed throughout the
          analysis. The classified forest extent increased between 2015 and
          2020, and again between 2020 and 2025, following the decline observed
          between 2010 and 2015. While the increase may reflect genuine
          processes such as vegetation regeneration, maturation, or recovery
          from disturbance, it should not be interpreted independently of the
          corresponding changes in herbaceous vegetation.
        </p>
        <p className="text">
          Unlike the previous assessment, the smaller land-cover classes
          generally declined in mapped extent. Bare soil decreased from 233.59
          ha to 100.12 ha, while urban areas declined from 384.58 ha to 69.91
          ha. Water also decreased slightly, from 76.70 ha to 68.30 ha.
        </p>
      </section>
      <section className="conclusion">
        <h3>Conclusion</h3>
        <p className="text">
          The analysis does not support a straightforward narrative of
          continuous forest decline across the entire study period. Instead,
          classified forest extent fluctuated substantially between observation
          periods, with corresponding changes in herbaceous vegetation. By 2025,
          the area classified as forest was greater than at the 2000 baseline.
          However, this should not be interpreted as evidence that forest loss
          did not occur. Rather, the results suggest that forest dynamics within
          the complex are more nuanced than a simple, one-directional decline in
          forest extent.
        </p>
        <p className="text">
          Changes in classified forest extent do not necessarily correspond
          directly to changes in the physical condition of the forest. An area
          may undergo selective harvesting or degradation, transition to a more
          open or herbaceous state, and subsequently regenerate. Depending on
          canopy density and spectral characteristics at the time of
          observation, such an area may shift between the forest and herbaceous
          vegetation classes without representing either permanent forest loss
          or complete recovery. Conversely, an area may remain classified as
          forest while experiencing substantial degradation or selective logging
          that is not captured by the classification. Remote sensing therefore
          provides a means of observing landscape change across decades, but the
          classification alone cannot establish the processes responsible for
          those changes.
        </p>
        <p className="text">
          The results should therefore be understood as a record of changes in
          classified land cover rather than a definitive measure of forest
          condition or forest loss. Their value lies not only in quantifying
          changes in the landscape, but also in identifying patterns that
          warrant further investigation. Examining these changes at the level of
          individual forest reserves over the full study period would provide an
          important next step, potentially revealing patterns of localized
          forest loss, regeneration, and land-cover conversion that are obscured
          when the Mau Forest Complex is considered as a single landscape.
        </p>
      </section>
      <section className="citations">
        <h3>References</h3>
        <p className="text">
          The project draws on the following academic publications for its
          historical context, methodology and analysis:
        </p>
        <ol className="citations-list">
          <li className="source" id="one">
            Müller-Koné, M., & Mkutu, K. (2025). Settlements as dispossession:
            Forest conservation and frontiers’ violence in Mau Forest, Kenya.
            World Development, 200, 107303.
            <a
              href="https://doi.org/10.1016/j.worlddev.2025.107303"
              target="_blank"
              className="link-to-source"
            >
              <img src={openLinkUrl} alt="open" />
            </a>
          </li>
          <li className="source" id="two">
            Boone, C., Lukalo, F., & Joireman, S. F. (2021). Promised Land:
            Settlement Schemes in Kenya, 1962 to 2016. Political Geography,
            89(1), 102393.
            <a
              href="https://doi.org/10.1016/j.polgeo.2021.102393"
              target="_blank"
              className="link-to-source"
            >
              <img src={openLinkUrl} alt="open" />
            </a>
          </li>
          <li className="source" id="three">
            Fibaek, M., & Green, E. (2019). Labour Control and the Establishment
            of Profitable Settler Agriculture in Colonial Kenya, c. 1920–45.
            Economic History of Developing Regions, 34(1), 72–110.
            <a
              href="https://doi.org/10.1080/20780389.2019.1581058"
              target="_blank"
              className="link-to-source"
            >
              <img src={openLinkUrl} alt="open" />
            </a>
          </li>
          <li className="source" id="four">
            Klopp, J. M., & Sang, J. K. (2011, October 20). Maps, Power, and the
            Destruction of the Mau Forest in Kenya.
            <a
              href="https://www.researchgate.net/publication/328410887_Maps_Power_and_the_Destruction_of_the_Mau_Forest_in_Kenya"
              target="_blank"
              className="link-to-source"
            >
              <img src={openLinkUrl} alt="open" />
            </a>
          </li>
        </ol>
      </section>
    </main>
  );
}

export default Main;
