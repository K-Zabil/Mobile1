import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  name: string;
  imageUrl: string;
  actionText?: string;
  onPress: () => void;
  onActionPress?: () => void;
}

export const DrinkItem: React.FC<Props> = ({
  name,
  imageUrl,
  actionText,
  onPress,
  onActionPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.item} onPress={onPress}>
      <Image style={styles.image} source={{ uri: imageUrl }} />

      <View style={styles.textContainer}>
        <Text style={styles.header}>{name}</Text>
        {actionText && (
          <TouchableOpacity style={styles.button} onPress={onActionPress}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width - 32,
  },
  textContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 2, 0.7)',
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 2, 0.7)',
    padding: 10,
    marginTop: 8,
  },
  actionText: {
    fontSize: 14,
  },
});