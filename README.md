# Kijiji iPhone Market analysis tool

Scrape iPhone ads from Kijiji.ca, view undervalued iphones on dashboard. Built to assist second hand iphone trader.

## Getting Started

There are 3 parts to this tool. Backend, Frontend, and the reposter. The backend is responsible for scraping ads and calculating statistics. It accounts for invalid ads such as broken or blacklisted phones. It also filters out merchant ads and case ads. The frontend is responsible for displaying the most valuable ads according to user dollar input. For example, if user inputs $300 for capital, it will display all iphone ads under $300 sorted by nearest physical distance, and greatest mean price minus ad price value. The mean is calculated according to all iphone ads posted on Kijiji.ca in the past week, as well as model type and memory size. Online status of the ad is also accounted for. If user decides to buy, clicking on visit ad button will take user to the actual kijiji ad. With this tool, user can profit by simply reselling on the same market for same price or higher. To take it one step further, the reposter app exists to be paired with a crontab job. With the right repost times, and enough capital, it's easy to profit from this tool.

### Prerequisites

Some knowledge of Google's Firebase, React.js, Node.js, and crontab is needed to start a working copy. Details are listed under readme of each module.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
