<template>
  <div class="p-5 w-10/12 mx-auto font-poppins text-darkest text-center">
    <p class="mb-3 text-grey text-sm">Friday, 07 June 2024</p>
    <h1 class="text-3xl leading-relaxed mb-8 font-medium">
      Insincere Question Detection on CQA Platform using Multinomial Naive Bayes
    </h1>
    <div class="flex gap-x-4 text-sm justify-center items-center mb-4">
      <img
        src="../assets/images/Rizha Alfianita.png"
        alt=""
        class="h-9 w-9 rounded-full object-cover"
      />
      <div class="text-start">
        <p class="text-red mb-0.5">Rizha Alfianita</p>
        <p class="text-grey">Researcher</p>
      </div>
    </div>
    <div class="p-8 text-justify leading-7">
      <p class="indent-12 mb-2.5">
        In the fast-paced information age, access to knowledge and answers to
        questions has become increasingly important. The internet has changed
        the way people seek information, from traditional methods such as books
        and journals, to digital platforms that provide instant and interactive
        answers. Based on data from the International Telecommunication Union,
        the number of global internet users will reach more than 5.4 billion
        people or around 67% of the world's population by 2023, a 45% increase
        from 2018 when the number of internet users only reached 1.7 billion
        people. This highlights the crucial role of the internet, which is
        increasingly becoming the main source of information for the global
        community. With faster and wider access, the internet allows people to
        acquire knowledge in near-instantaneous time.
      </p>
      <p class="indent-12 mb-2.5">
        One of the evolving forms of this source of information retrieval is
        Community Question Answering (CQA). Since the rise of digital platforms,
        especially web-based services, the popularity of CQA platforms has
        increased in recent years. For example, Quora, one of the leading CQA
        platforms, through its Quora for Business website, reports that it will
        have more than 400 million monthly active users by 2023. Stack Overflow,
        which is a pillar platform for the programming community, recorded more
        than 51 million monthly visitors in 2020. This data shows that more and
        more people are relying on the CQA platform to find answers to their
        questions and share knowledge.
      </p>
      <p class="indent-12 mb-2.5">
        CQA has become an important and reliable source of information for many.
        The convenience offered by CQA proves that it is more efficient as users
        can ask full questions rather than just using a few keywords on a search
        engine. The answer options are also broader as community members can
        provide responses based on their experience and knowledge directly,
        resulting in more relevant information compared to search results that
        are usually a list of websites, articles, and documents
      </p>
      <p class="indent-12 mb-2.5">
        However, CQA has a big challenge in ensuring that the content it
        contains is trustworthy and of high quality. CQA allows its users to
        upload content freely about whatever they want to say [6]. The CQA
        platform is usually used by users to genuinely ask something they don't
        know. The problem arises when a user abuses the platform by posting a
        question that, instead of getting a helpful answer, is intended to make
        a statement or seek attention/views, which is known as an insincere
        question.
      </p>
      <p class="indent-12 mb-2.5">
        Quora is one of CQA platform that suffers from this problem. A question
        is said to be insincere if it has the following characteristics: (1) it
        has a non-neutral tone; (2) it is dismissive or inflammatory; (3) it is
        not based on reality / made up; (4) it contains sexual content. Having a
        non-neutral tone means using overly dramatic language to highlight or
        convey a rhetorical statement about a group of people. Disparaging or
        inflammatory means discriminating, attacking, or insulting a group to
        the point of insulting a person's characteristics. Not based on reality
        means that a question is based on false assumptions and contains false
        information. Sexual content means that the question contains sexual
        content, such as incest, bestiality, or pedophilia. For Quora, it is
        important to eliminate these kinds of insincere questions so that their
        platform remains a comfortable place for users to ask questions and
        share knowledge.
      </p>
      <p class="indent-12 mb-2.5">
        Some research has been done in handling these insincere questions. Fan &
        Qin with a transfer learning approach used several transformer models
        from the BERT family, including BERT, DISTILBERT, ROBERTA, and ALBERT.
        Another study conducted by Wang & Ranganathan applied several other BERT
        variations based on LSTM and GRU models on the same dataset, Quora
        Insincere Question Classification.
      </p>
      <p class="indent-12 mb-2.5">
        This research aims to produce an insincere question detection system
        using a simpler model with equally reliable performance. With the same
        dataset, we will use a basic machine learning model, Multinomial Naïve
        Bayes for text classification tasks with TF-IDF as the feature
        extraction model. It is expected that this research can help reduce
        toxic content such as insincere questions as an effort to improve the
        quality of the CQA platform.
      </p>
    </div>
  </div>
</template>
