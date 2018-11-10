# Takes a file CSV file called "data.csv" and outputs each row as a numbered YAML file.
# Data in the first row of the CSV is assumed to be the column heading.

# Import the python library for parsing CSV files.
import csv
import urllib2
import os
import glob
# Open our data file in read-mode.
csvfile = open('data.csv', 'r')

# Save a CSV Reader object.
datareader = csv.reader(csvfile, delimiter=',', quotechar='"')

# Empty array for data headings, which we will fill with the first row from our CSV.
data_headings = []

# Loop through each row...
for row_index, row in enumerate(datareader):

	# If this is the first row, populate our data_headings variable.
	if row_index == 0:
		data_headings = row

	# Othrwise, create a YAML file from the data in this row...
	else:
		# Open a new file with filename based on index number of our current row.

                if (row[0]): # test first cell for empty gap
                    itemname = str(row[3].rstrip().lstrip().replace(" ", "_"))
                    directory = "items/{}".format(itemname)
                    if os.path.exists(directory):
                        continue
                    os.makedirs(directory)
                    filename = directory + "/" + itemname + '.yml'
                    new_yaml = open(filename, 'w')

                    # Empty string that we will fill with YAML formatted text based on data extracted from our CSV.
                    yaml_text = ""

		# Loop through each cell in this row...
		    for cell_index, cell in enumerate(row):

			# Compile a line of YAML text from our headings list and the text of the current cell, followed by a linebreak.
			# Heading text is converted to lowercase. Spaces are converted to underscores and hyphens are removed.
			# In the cell text, line endings are replaced with commas.
			cell_heading = data_headings[cell_index].replace(" ", "_").replace("-", "")
                        if (cell_heading == "image_paths"):
                            # Chop up string
                            print(cell.split(","))
                            s = cell.split(",")
                            # Download images
                            image_paths_yaml = []
                            for i, image_url in enumerate(s):
                                image_id = image_url.split('?id=')[1]
                                os.system("gdrive download {} --path {}".format(image_id, directory))
                            for i, img_f in enumerate(glob.glob(directory+'/*.jpg')):
                                img_f_renamed = '{}_{}.jpg'.format(itemname, i)
                                img_f_renamed_dir = directory + "/" + img_f_renamed
                                os.rename(img_f, img_f_renamed_dir)
                                image_paths_yaml.append(img_f_renamed)

                            os.system("sips -Z 1080 {}/*.jpg".format(directory))

                            cell_text = cell_heading + ": " + "{}".format(image_paths_yaml) + "\n"
                        else:
			    cell_text = cell_heading + ": " + cell.replace("\n", ", ") + "\n"

			# Add this line of text to the current YAML string.
			yaml_text += cell_text

                        # Write our YAML string to the new text file and close it.
                    new_yaml = open(filename, 'w')
                    new_yaml.write(yaml_text)
                    toronto_template_yaml = open("item_toronto_template.yml", "r")
                    new_yaml.write(toronto_template_yaml.read())
                    new_yaml.close()

# We're done! Close the CSV file.
csvfile.close()
