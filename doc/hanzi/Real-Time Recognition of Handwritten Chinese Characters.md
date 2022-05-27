# Real-Time Recognition of Handwritten Chinese Characters 
## Spanning a Large Inventory of 30,000 Characters

https://machinelearning.apple.com/research/handwriting

[[Handwriting Recognition]] Team

[[Handwriting recognition]] is more important than ever given the prevalence of mobile phones, tablets, and wearable gear like smartwatches. The large symbol inventory required to support [[Chinese handwriting]] recognition on such mobile devices poses unique challenges. This article describes how we met those challenges to achieve real-time performance on iPhone, iPad, and Apple Watch (in Scribble mode). Our recognition system, based on [[deep learning]], accurately handles a set of up to 30,000 characters. To achieve acceptable accuracy, we paid particular attention to data collection conditions, representativeness of writing styles, and training regimen. We found that, with proper care, even larger inventories are within reach. Our experiments show that accuracy only degrades slowly as the inventory increases, as long as we use training data of sufficient quality and in sufficient quantity.

## Introduction

Handwriting recognition can enhance user experience on mobile devices, particularly for [[Chinese input]] given the relative complexity of keyboard methods. [[Chinese handwriting]] recognition is uniquely challenging, due to the **large size of the underlying character inventory**. Unlike alphabet-based writing, which typically involves on the order of 100 symbols, the set of [[hanzi/Hànzì]] characters in [[Chinese National Standard/GB18030-2005]] contains 27,533 entries, and many additional logographic characters are in use throughout [[hanzi/Greater China]].

For computational tractability, it is usual to focus on a restricted number of characters, deemed most representative of usage in daily life. Thus, the standard [[GB2312-80]] set includes only 6,763 entries (3,755 and 3,008 characters in the [[GB2312-80#level-1]] and [[GB2312-80|level-2]] sets, respectively). The closely aligned character set used in the popular [[hanzi/CASIA]] databases, built by the [[org/Institute of Automation of Chinese Academy of Sciences]], comprises a total of 7,356 entries [[6]](https://machinelearning.apple.com/research/handwriting#6). The [[hanzi/SCUT-COUCH]] database has similar coverage [[8]](https://machinelearning.apple.com/research/handwriting#8).

