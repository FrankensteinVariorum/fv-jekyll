---
layout: default
title: Method
permalink: /method/
---

We began preparing a new digital encoding of the novel *Frankenstein* by returning to its first online text in Stuart Curran’s and Jack Lynch’s [Pennsylvania Electronic Edition](http://knarf.english.upenn.edu/ ). That hypertext edition represented groundbreaking digital scholarship in the era of web 1.0, by deploying an interface for reading the 1818 and 1831 texts in juxtaposed parallel texts, using HTML frames now deprecated by the Worldwide Web Consortium. That edition prepared the novel in hundreds of distinct HTML files, representing a few paragraphs at a time to provide its comparison view of the 1818 and 1831 editions. The *Pennsylvania Electronic Edition* also gathered many hundreds of files of context, including editions of related poems like “The Witch of Atlas” and “The Revolt of Islam” together with scholarly articles, maps, glosses and annotations.

The *Pennsylvania Electronic Edition* was partially curated by [Romantic Circles](https://www.rc.umd.edu/editions/frankenstein) in a version of TEI, the XML language of the Text Encoding Initiative recommended for sustainable transfer and long-range storage of digital editions. According to Neil Fraistat, the HTML publication of the 1818 and 1831 editions has become Romantic Circles’ most-visited site. However, the HTML “skeleton” of the *Pennsylvania Electronic Edition* posed a serious problem to convert to TEI, and the TEI first produced from the HTML consisted of minimal TEI renderings of HTML tags -- mainly presentational rather than semantic markup. Though the TEI provides critical apparatus markup for storing alternate versions of passages and for storing multiple editions in a single XML document, the first TEI edition of *Frankenstein* for Romantic Circles preserved the 1818 and 1831 texts in separate documents. A representation of the texts in comparison appears via Juxta Commons, but there are problems with the differentiation of long texts using the Juxta algorithm.

Our work on the project has involved returning to the code of Curran’s and Lynch’s electronic editions of the 1818 and 1831 texts, stripping its markup and preparing it as a plain text document with pseudo markup to store information marked in the original HTML edition https://github.com/ebeshero/Pittsburgh_Frankenstein/blob/master/Plain_Texts/1818_full.txt for details). We are correcting our restored text against photo facsimiles of the originals, and we are preparing a plain text edition from OCR of the 1823 edition, derived via ABBYY Finereader, and formatted like our plain texts of the 1818 and 1823. We are preparing a new edition in TEI by first processing the plain texts with [CollateX](http://collatex.net/), which locates the points of variance (or “deltas”) and outputs these in TEI XML critical apparatus markup. We are planning a new implementation of TEI critical apparatus markup to point to specific locations in the manuscript notebooks. This will provide a way to link a reading interface of the novel that highlights “hotspots” of variance in the print edition and that links into relevant passages in the Notebooks.

We first prepared the “skeleton” of the new TEI edition, a structure fundamentally different from the TEI currently featured at Romantic Circles. We include a version of the little-studied 1823 and "Thomas" editions. We hope our edition will inspire fresh investigations of longstanding questions about Frankenstein’s transformations, such as the extent of Godwin’s interventions in the text in 1823 and how many of these these persist in the 1831 text.

## Presentations

* [The Pittsburgh Digital Frankenstein Project: Reassembling Textual Bodies](http://slides.com/elisabeshero-bondar/pghpitt_frankenstein): Presentation for the Humanities Center at the University of Pittsburgh, Cathedral of Learning on 2 April 2018. Explanation of the project and range of collaborating people and institutions. Updated with material on latest full collation of manuscript notebooks, Thomas edition, and 1818, 1823, and 1831 published editions.

* [Bicentennial Bits and Bytes: The Pittsburgh Digital Frankenstein Project](http://slides.com/elisabeshero-bondar/mla_bicentfrank): MLA 2018 panel presentation on our variorum edition project, reconciling previous digital editions, ongoing stylometric research, and annotation development.

* [Frankenstein and Text Genetics](http://bit.ly/FrankenTextGen): an introduction to the novel and its contexts, and our project’s connection with the Shelley-Godwin Archive

* a slide presentation by Elisa Beshero-Bondar and Raffaele Viglianti for the 2017 NASSR Conference on 11 August 2017: [http://bit.ly/NASSR_BicFrank](http://bit.ly/NASSR_BicFrank)

* Balisage Proceedings for the Symposium on Up-Conversion and Up-Translation (31 July 2017): [Rebuilding a digital Frankenstein by 2018: Towards a theory of losses and gains in up-translation](https://www.balisage.net/Proceedings/vol20/html/Beshero-Bondar01/BalisageVol20-Beshero-Bondar01.html)

* [The Frankenstein Variorum Challenge: Finding a Clearer View of Change Over Time](https://slides.com/elisabeshero-bondar/fv_viewchange#/) is a slide presentation given by Elisa Beshero-Bondar and Rikk Mulligan on July 12, 2019 at the Digital Humanities Conference in Utrecht, Netherlands.
