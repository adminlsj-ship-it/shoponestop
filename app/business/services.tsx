import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Plus, CreditCard as Edit, Trash2, DollarSign, Clock, Tag } from 'lucide-react-native';

const serviceTemplates = [
  {
    id: '1',
    name: 'Hair Cut & Style',
    type: 'Hair Services',
    price: 65,
    duration: 60,
    description: 'Professional haircut with wash, cut, and styling',
    category: 'Hair Styling',
    depositRequired: false,
  },
  {
    id: '2',
    name: 'Hair Color - Full',
    type: 'Hair Services',
    price: 120,
    duration: 180,
    description: 'Complete hair coloring service with consultation',
    category: 'Hair Coloring',
    depositRequired: true,
    depositAmount: 30,
  },
  {
    id: '3',
    name: 'Highlights',
    type: 'Hair Services',
    price: 95,
    duration: 150,
    description: 'Professional highlights with toner',
    category: 'Hair Coloring',
    depositRequired: true,
    depositAmount: 25,
  },
  {
    id: '4',
    name: 'Bridal Makeup',
    type: 'Makeup Services',
    price: 150,
    duration: 120,
    description: 'Complete bridal makeup with trial session',
    category: 'Makeup',
    depositRequired: true,
    depositAmount: 50,
  },
  {
    id: '5',
    name: 'Facial Treatment',
    type: 'Skincare Services',
    price: 85,
    duration: 90,
    description: 'Deep cleansing facial with moisturizing treatment',
    category: 'Skincare',
    depositRequired: false,
  },
  {
    id: '6',
    name: 'Manicure & Pedicure',
    type: 'Nail Services',
    price: 55,
    duration: 75,
    description: 'Complete nail care with polish application',
    category: 'Nails',
    depositRequired: false,
  },
];

const services = [
  {
    id: '1',
    name: 'Premium Hair Cut & Style',
    description: 'Professional haircut with wash, cut, and styling',
    price: 85,
    duration: 90,
    category: 'Hair Styling',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
  },
  {
    id: '2',
    name: 'Bridal Makeup Package',
    description: 'Complete bridal makeup with trial session',
    price: 250,
    duration: 180,
    category: 'Makeup',
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
  },
];

export default function ServicesManagement() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    depositRequired: false,
    depositAmount: '',
  });

  const handleAddService = () => {
    if (!newService.name || !newService.type || !newService.price || !newService.duration) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    // Add service logic here
    Alert.alert('Success', 'Service added successfully!');
    setShowAddForm(false);
    setNewService({ 
      name: '', 
      type: '', 
      description: '', 
      price: '', 
      duration: '', 
      category: '',
      depositRequired: false,
      depositAmount: '',
    });
  };

  const handleUseTemplate = (template: any) => {
    setNewService({
      name: template.name,
      type: template.type,
      description: template.description,
      price: template.price.toString(),
      duration: template.duration.toString(),
      category: template.category,
      depositRequired: template.depositRequired,
      depositAmount: template.depositAmount?.toString() || '',
    });
    setShowTemplates(false);
    setShowAddForm(true);
  };

  const handleDeleteService = (serviceId: string) => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // Delete service logic here
          Alert.alert('Success', 'Service deleted successfully!');
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#374151" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.title}>Manage Services</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowTemplates(!showTemplates)}
          >
            <Plus size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Service Templates */}
        {showTemplates && (
          <View style={styles.templatesSection}>
            <Text style={styles.templatesTitle}>Choose a Service Template</Text>
            <Text style={styles.templatesSubtitle}>
              Select from our pre-built templates or create your own custom service
            </Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templatesScroll}>
              {serviceTemplates.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  style={styles.templateCard}
                  onPress={() => handleUseTemplate(template)}
                >
                  <Text style={styles.templateName}>{template.name}</Text>
                  <Text style={styles.templateType}>{template.type}</Text>
                  <Text style={styles.templatePrice}>${template.price}</Text>
                  <Text style={styles.templateDuration}>{template.duration} min</Text>
                  {template.depositRequired && (
                    <View style={styles.depositBadge}>
                      <Text style={styles.depositText}>Deposit Required</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.templateActions}>
              <TouchableOpacity 
                style={styles.customServiceButton}
                onPress={() => {
                  setShowTemplates(false);
                  setShowAddForm(true);
                }}
              >
                <Text style={styles.customServiceText}>Create Custom Service</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelTemplatesButton}
                onPress={() => setShowTemplates(false)}
              >
                <Text style={styles.cancelTemplatesText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Add Service Form */}
        {showAddForm && (
          <View style={styles.addServiceForm}>
            <Text style={styles.formTitle}>Add New Service</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Service Name *</Text>
              <TextInput
                style={styles.input}
                value={newService.name}
                onChangeText={(text) => setNewService({...newService, name: text})}
                placeholder="e.g., Premium Hair Cut"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Service Type *</Text>
              <TextInput
                style={styles.input}
                value={newService.type}
                onChangeText={(text) => setNewService({...newService, type: text})}
                placeholder="e.g., Hair Services, Makeup Services"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newService.description}
                onChangeText={(text) => setNewService({...newService, description: text})}
                placeholder="Describe your service..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Price ($) *</Text>
                <TextInput
                  style={styles.input}
                  value={newService.price}
                  onChangeText={(text) => setNewService({...newService, price: text})}
                  placeholder="85"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Duration (min) *</Text>
                <TextInput
                  style={styles.input}
                  value={newService.duration}
                  onChangeText={(text) => setNewService({...newService, duration: text})}
                  placeholder="90"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <TextInput
                style={styles.input}
                value={newService.category}
                onChangeText={(text) => setNewService({...newService, category: text})}
                placeholder="e.g., Hair Styling, Makeup, Nails"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, newService.depositRequired && styles.checkboxChecked]}
                  onPress={() => setNewService({...newService, depositRequired: !newService.depositRequired})}
                >
                  {newService.depositRequired && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Require Deposit</Text>
              </View>
              
              {newService.depositRequired && (
                <TextInput
                  style={[styles.input, styles.depositInput]}
                  value={newService.depositAmount}
                  onChangeText={(text) => setNewService({...newService, depositAmount: text})}
                  placeholder="Deposit amount ($)"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              )}
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowAddForm(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddService}>
                <Text style={styles.saveButtonText}>Add Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Services List */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Your Services</Text>
          
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <Image source={{ uri: service.image }} style={styles.serviceImage} />
              
              <View style={styles.serviceInfo}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.serviceActions}>
                    <TouchableOpacity style={styles.editButton}>
                      <Edit size={16} color="#6B7280" strokeWidth={2} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDeleteService(service.id)}
                    >
                      <Trash2 size={16} color="#EF4444" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <Text style={styles.serviceDescription}>{service.description}</Text>
                
                <View style={styles.serviceDetails}>
                  <View style={styles.detailItem}>
                    <DollarSign size={16} color="#10B981" strokeWidth={2} />
                    <Text style={styles.detailText}>${service.price}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={16} color="#8B5CF6" strokeWidth={2} />
                    <Text style={styles.detailText}>{service.duration} min</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Tag size={16} color="#F59E0B" strokeWidth={2} />
                    <Text style={styles.detailText}>{service.category}</Text>
                  </View>
                </View>
                
                <View style={styles.serviceStatus}>
                  <View style={[
                    styles.statusIndicator,
                    service.isActive ? styles.activeIndicator : styles.inactiveIndicator
                  ]} />
                  <Text style={styles.statusText}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templatesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  templatesTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 8,
  },
  templatesSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 20,
  },
  templatesScroll: {
    marginBottom: 20,
  },
  templateCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 200,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  templateName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  templateType: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8B5CF6',
    marginBottom: 8,
  },
  templatePrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#F43F5E',
    marginBottom: 4,
  },
  templateDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  depositBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  depositText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#D97706',
  },
  templateActions: {
    flexDirection: 'row',
    gap: 12,
  },
  customServiceButton: {
    flex: 1,
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  customServiceText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  cancelTemplatesButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelTemplatesText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
  },
  addServiceForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  formTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F43F5E',
    borderColor: '#F43F5E',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
  },
  depositInput: {
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  servicesContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  serviceInfo: {
    padding: 20,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    flex: 1,
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  serviceDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  serviceDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  serviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeIndicator: {
    backgroundColor: '#10B981',
  },
  inactiveIndicator: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
});