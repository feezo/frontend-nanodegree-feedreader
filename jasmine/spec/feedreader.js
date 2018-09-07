
$((() => {
    /* This is our first test suite - it contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is the tests to make sure that the
         * allFeeds variable has been defined and that it is not empty
         */

        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* this is the test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('urls are defined', () => {
           allFeeds.forEach(feed => {
             expect(feed.url).toBeTruthy();
           });
         });

        /* This is the test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('names are defined', () => {
           allFeeds.forEach(feed => {
             expect(feed.name).toBeTruthy();
           });
         });
    });


/* Here we Write a new test suite named "The menu" */
describe('The Menu', () => {

  /* This test within our new menu suite
   * ensures the menu element is
   * hidden by default.
   */

   it('Menu element is hidden', () => {
     expect($('body').hasClass('menu-hidden')).toEqual(true)
   })

   /* This is the test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
  it('Menu element is clicked',() => {
    $('.menu-icon-link').trigger('click')
    expect($('body').hasClass('menu-hidden')).toBe(false)
    $('.menu-icon-link').trigger('click')
    expect($('body').hasClass('menu-hidden')).toBe(true)
  })
})



    /*Here we write a new test suite named "Initial Entries" */

        /* Here i write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * As loadFeed() is asynchronous  this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         describe('initial entries', () => {
           beforeEach(done => {
             loadFeed(0,() => {
               done();
             })
           })

           it('define if at least one entries', () => {
               expect($('.entry .feed')).toBeDefined()
           });
         });

    /* Here i Write a new test suite named "New Feed Selection" */

      /*a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       *load First feed
       *store contents in a variable.
       *load second feed as a callback of the first
       *store content of this feed in another variable
       *call done as a callback of the second loadFeed() function
       */

       describe('New Feed Selection', () => {
         beforeEach(done => {
           $('.feed').empty()
           loadFeed(0,() => {
                   entriesStart = $('.feed').find(allFeeds.url);
                   loadFeed(1, cb => {
                     entriesEnd = $('.feed').find(allFeeds.url);
                       done();
                      });
                 });

               });

               it('if new field selection is different from previous', () => {
                     expect(entriesStart).not.toBe(entriesEnd);
                   });

       });

})());
