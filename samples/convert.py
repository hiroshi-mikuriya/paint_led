
import numpy as np
import json
import cv2
import sys

a = json.load(open(sys.argv[1]))
m = np.zeros((32, 16, 3), dtype=np.uint8)

for x in range(16):
  row = a['led'][str(x)]
  for y in range(32):
    v = row[y]
    v0 = [v[i: i+2] for i in range(0, len(v), 2)]
    r = int(v0[0], 16)
    g = int(v0[1], 16)
    b = int(v0[2], 16)
    m[y][x] = [0, g, r]

# cv2.imshow("image", m)
# cv2.waitKey()
cv2.imwrite(sys.argv[2], m)
