import numpy as np
import matplotlib.pyplot as plt

file_path = "./pred_masks.npy"

data = np.load(file_path)

def paths(img):
    distance = [0,0] #เก็บล่าสุด
    paths = [] #ตำแหน่ง ก้อนแต่ละก้อน ที่ห่างกัน
    dummyPath = [] #ตำแหน่งก้อนทั้ใกล้กัน
    shapeImg = img.shape
    for i in range(256):
        for j in range(256):
            if (img[i][j][0] > 9e-2):
                    # dummyPath.append({"x": i, "y": j})    [{},{},{}] 
                if ( (((j-distance[1])**2) + ((i-distance[0])**2))**0.5 ) > 5 and distance != [0,0]:
                    paths.append({"drawMode": True,"strokeColor": "black","strokeWidth": 2,"paths":dummyPath})
                    dummyPath = []
                dummyPath.append({'x':j, 'y': i})
                distance = [i,j]
    paths.append({"drawMode": True,"strokeColor": "black","strokeWidth": 2,"paths":dummyPath})
    return paths
for i in range(2):
    # Display each image in the collection
    # for j in range(9):      
    #     plt.subplot(3,3,j+1)
        # plt.imshow(data[i, :, :,j]) 
    #     print(data[i][:][:][j])
    # plt.title(f'Image {i+1}')
    # plt.show()
    aaa = []
    aaa.extend(paths(data[i]))
    # for k in range(256):
        # aaa.extend([{"x": j, "y": k} for j in range(256) if data[i][k][j][0] > 9e-2])
        # aaa.append([data[i][k][j][0] for j in range(256)])

    print(aaa)
    print(np.shape(aaa))



    json_output_path = f"images_{i + 1}.json"
    data_dict = {
        "shape": np.shape(aaa),
        "data": aaa
    }
    with open(json_output_path, 'w') as json_file:
        json.dump(data_dict, json_file)